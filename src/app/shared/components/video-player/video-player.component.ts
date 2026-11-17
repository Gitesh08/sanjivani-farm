import { 
  Component, 
  ElementRef, 
  Input, 
  Output, 
  EventEmitter, 
  ViewChild, 
  AfterViewInit, 
  OnDestroy, 
  PLATFORM_ID, 
  inject, 
  NgZone, 
  booleanAttribute,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
// hls.js is lazy-loaded on first use to avoid adding ~1MB to the initial JS bundle

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- The poster is rendered as an img on top of the video in activities.html, 
         but here we can also apply it natively. -->
    <div class="video-container">
      <video
        #videoElement
        [poster]="poster"
        [loop]="loop"
        [muted]="muted"
        [attr.muted]="muted ? '' : null"
        [attr.playsinline]="playsinline ? '' : null"
        [attr.autoplay]="autoplay ? '' : null"
        [preload]="preload"
        [controls]="controls"
        class="video-player-element"
        [class]="customClass">
        <track kind="captions" srclang="en" label="English" default src="data:text/vtt,WEBVTT">
      </video>
      @if (isBuffering && !hideSpinner) {
        <div class="video-spinner-overlay">
          <div class="video-spinner"></div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .video-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .video-player-element {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-spinner-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.15);
      z-index: 10;
      pointer-events: none;
    }
    .video-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() hlsUrl!: string;
  @Input() fallbackMp4!: string;
  @Input() poster: string = '';
  
  @Input({ transform: booleanAttribute }) autoplay: boolean = false;
  @Input({ transform: booleanAttribute }) loop: boolean = true;
  @Input({ transform: booleanAttribute }) muted: boolean = true;
  @Input({ transform: booleanAttribute }) playsinline: boolean = true;
  @Input({ transform: booleanAttribute }) controls: boolean = false;
  @Input({ transform: booleanAttribute }) preferHighQuality: boolean = false;
  @Input({ transform: booleanAttribute }) isHero: boolean = false;
  @Input({ transform: booleanAttribute }) hideSpinner: boolean = false;
  @Input() preload: string = 'none';
  @Input() customClass: string = '';

  @Output() canplay = new EventEmitter<Event>();
  @Output() playing = new EventEmitter<Event>();
  @Output() pauseEvent = new EventEmitter<Event>();

  @ViewChild('videoElement') videoRef!: ElementRef<HTMLVideoElement>;

  isBuffering = false;
  private lastTime = -1;

  private hls: any | null = null;
  private isBrowser: boolean;
  private io?: IntersectionObserver;
  private isInitialized = false;
  private hasFallenBackToMp4 = false;

  private ngZone = inject(NgZone);
  private el = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  @Input({ transform: booleanAttribute }) forceInit: boolean = false;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    
    this.bindEvents();
    
    if (this.autoplay || this.forceInit) {
      this.initPlayer();
      this.isInitialized = true;
    } else {
      this.setupIntersectionObserver();
    }
    this.checkReadyState();
  }

  private bindEvents(): void {
    if (!this.videoRef?.nativeElement) return;
    const video = this.videoRef.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      video.addEventListener('canplay', (e) => {
        this.updateBuffering(false);
        this.canplay.emit(e);
      });
      video.addEventListener('playing', (e) => {
        this.updateBuffering(false);
        this.playing.emit(e);
      });
      video.addEventListener('pause', (e) => this.pauseEvent.emit(e));
      video.addEventListener('waiting', () => this.updateBuffering(true));
      video.addEventListener('timeupdate', () => {
        if (this.isBuffering) this.updateBuffering(false);
      });
      video.addEventListener('ended', () => {
        if (this.loop) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      });
      video.addEventListener('error', (e) => this.onError(e));
    });
  }

  private updateBuffering(buffering: boolean): void {
    if (this.isBuffering !== buffering) {
      this.ngZone.run(() => {
        this.isBuffering = buffering;
        this.cdr.markForCheck();
      });
    }
  }

  private checkReadyState(): void {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      if (video.readyState >= 3) {
        setTimeout(() => {
          this.isBuffering = false;
          this.canplay.emit(new Event('canplay'));
          if (!video.paused) {
            this.playing.emit(new Event('playing'));
          }
        }, 50);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isBrowser) return;
    
    // If hlsUrl or fallbackMp4 changes after initialization, reload the player
    if ((changes['hlsUrl'] && !changes['hlsUrl'].isFirstChange()) || 
        (changes['fallbackMp4'] && !changes['fallbackMp4'].isFirstChange())) {
      if (this.isInitialized || this.autoplay) {
        this.initPlayer();
      }
    }
    
    // Support changing poster dynamically
    if (changes['poster'] && !changes['poster'].isFirstChange()) {
       if (this.videoRef?.nativeElement) {
         this.videoRef.nativeElement.poster = this.poster;
       }
    }
  }

  private setupIntersectionObserver() {
    if (this.forceInit || this.autoplay || !('IntersectionObserver' in window)) {
      this.initPlayer();
      this.isInitialized = true;
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      this.io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isInitialized) {
            this.initPlayer();
            this.isInitialized = true;
          }
        });
      }, { rootMargin: '300px' });
      this.io.observe(this.el.nativeElement);

      // Mobile carousel fallback: if not intersected within 800ms, initialize anyway
      setTimeout(() => {
        if (!this.isInitialized) {
          this.initPlayer();
          this.isInitialized = true;
        }
      }, 800);
    });
  }

  private getCleanHlsUrl(url: string): string {
    if (!url) return '';
    // For native Safari HLS: bypass Windows backslash '\' bug in master.m3u8
    // and stream pristine 1080p (or 720p) variant playlist directly
    if (url.includes('master.m3u8')) {
      const variant = (this.isHero || this.preferHighQuality) ? '1080' : '720';
      return url.replace(/master\.m3u8$/, `${variant}/index.m3u8`);
    }
    return url;
  }

  private async initPlayer() {
    if (!this.videoRef) return;
    const video = this.videoRef.nativeElement;

    // Cleanup previous instance if any
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }

    if (this.hlsUrl) {
      const cleanUrl = this.getCleanHlsUrl(this.hlsUrl);

      // Dynamically import hls.js only when a video actually needs to play
      const { default: Hls } = await import('hls.js');

      if (Hls.isSupported()) {
        const hlsConfig: any = {
          // Never cap resolution to small mobile CSS screen width!
          capLevelToPlayerSize: false,
          maxBufferLength: 20,
          maxMaxBufferLength: 40,
          maxBufferSize: 60 * 1000 * 1000,
        };

        if (this.isHero || this.preferHighQuality) {
          // Provide an initial high bandwidth estimate (15 Mbps) so HLS picks 1080p Full HD on first probe
          hlsConfig.abrEwmaDefaultEstimate = 15000000;
          hlsConfig.testBandwidth = false;
        }

        this.hls = new Hls(hlsConfig);

        // Sanitize any backslashes in parsed variant URLs if a master playlist is loaded
        this.hls.on(Hls.Events.MANIFEST_LOADED, (event: any, data: any) => {
          if (data?.levels) {
            data.levels.forEach((lvl: any) => {
              if (lvl.url) {
                lvl.url = lvl.url.map((u: string) => u.replace(/\\/g, '/'));
              }
            });
          }
        });

        let networkRetries = 0;
        this.hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                networkRetries++;
                if (networkRetries <= 2) {
                  console.warn(`[VideoPlayer] HLS Network Error, retrying (${networkRetries}/2)...`, data);
                  this.hls?.startLoad();
                } else {
                  console.warn('[VideoPlayer] HLS Network Error retries exceeded, falling back to MP4');
                  this.fallbackToMp4(video);
                }
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn('[VideoPlayer] HLS Media Error, trying to recover...', data);
                this.hls?.recoverMediaError();
                break;
              default:
                console.warn('[VideoPlayer] HLS Fatal Error, falling back to MP4', data);
                this.fallbackToMp4(video);
                break;
            }
          }
        });

        // Smart Initial Resolution: Guarantee 1080p Full HD on mobile & desktop
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
          if (!this.hls || !data.levels || data.levels.length === 0) return;

          if (this.isHero || this.preferHighQuality) {
            const highestLevel = data.levels.length - 1;
            this.hls.startLevel = highestLevel;
            this.hls.nextLevel = highestLevel;
            this.hls.currentLevel = highestLevel;
            // Prevent ABR from dropping below 720p on mobile
            if (data.levels.length > 1) {
              this.hls.minAutoLevel = Math.max(0, data.levels.length - 2);
            }
          }
        });

        this.hls.loadSource(cleanUrl);
        this.hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari HLS (iOS, iPadOS, Safari macOS)
        // Bypass Windows backslash '\' bug in master.m3u8 by streaming clean 1080p/720p variant playlist directly
        video.src = cleanUrl;
        video.load();
      } else {
        this.fallbackToMp4(video);
      }
    } else {
      this.fallbackToMp4(video);
    }
  }

  private fallbackToMp4(video: HTMLVideoElement) {
    if (this.hasFallenBackToMp4) return;
    this.hasFallenBackToMp4 = true;
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    if (this.fallbackMp4) {
      video.src = this.fallbackMp4;
      video.load();
    }
  }

  // Expose play/pause methods so parent components (like activities) can control it seamlessly
  async play(): Promise<void> {
    if (!this.isInitialized) {
      await this.initPlayer();
      this.isInitialized = true;
    }
    if (this.videoRef?.nativeElement) {
      return this.videoRef.nativeElement.play();
    }
  }

  pause(): void {
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.pause();
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.muted = muted;
    }
  }

  // Removed template-bound event handlers to prevent Zone thrashing
  
  onError(event: Event) {
    // If native playback errors (e.g. Safari HLS fails), try MP4 fallback
    if (this.videoRef?.nativeElement && !this.hls && !this.hasFallenBackToMp4) {
       this.fallbackToMp4(this.videoRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
  }
}
