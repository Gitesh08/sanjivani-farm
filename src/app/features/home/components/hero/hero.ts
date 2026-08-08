import {
  Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, inject, ElementRef, AfterViewInit, NgZone, signal, OnDestroy, ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { MediaService } from '../../../../core/services/media.service';
import { VideoPlayerComponent } from '../../../../shared/components/video-player/video-player.component';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [CommonModule, VideoPlayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { ngSkipHydration: 'true' },
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  isWaChatOpen = signal(false);
  isWaTyping = signal(false);
  hasShownWelcome = signal(false);

  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private splashState = inject(SplashStateService);
  public media = inject(MediaService);
  private splashSub?: Subscription;

  @ViewChild('heroVideo') videoRef!: VideoPlayerComponent;

  readonly videoReady = signal(false);
  // Appending #t=0.001 is a legendary fix for Chrome's cached MP4 freeze bug, 
  // forcing the media pipeline to initialize the demuxer correctly.
  readonly heroHls = signal<string>(this.media.masterPlaylist('hero-section'));
  readonly heroMp4 = signal<string>(this.media.fallbackMp4('hero-section') + '#t=0.001');
  readonly heroPoster = signal<string>(this.media.poster('hero-section'));

  onVideoReady(): void {
    this.videoReady.set(true);
  }

  // 360 Aerial Tour State
  readonly isTourOpen = signal(false);
  readonly currentVideoIndex = signal(0);
  readonly tourVideoPlaying = signal(false);
  
  readonly tourVideos = [
    {
      hls: this.media.masterPlaylist('drone-shot_01'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_01'),
      poster: this.media.poster('drone-shot_01')
    },
    {
      hls: this.media.masterPlaylist('drone-shot_02'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_02'),
      poster: this.media.poster('drone-shot_02')
    },
    {
      hls: this.media.masterPlaylist('drone-shot_03'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_03'),
      poster: this.media.poster('drone-shot_03')
    },
    {
      hls: this.media.masterPlaylist('drone-shot_04'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_04'),
      poster: this.media.poster('drone-shot_04')
    },
    {
      hls: this.media.masterPlaylist('drone-shot_05'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_05'),
      poster: this.media.poster('drone-shot_05')
    }
  ];

  openTour(): void {
    this.currentVideoIndex.set(0);
    this.isTourOpen.set(true);
    this.tourVideoPlaying.set(false);
    if (this.videoRef) {
      this.videoRef.pause();
    }
  }

  closeTour(): void {
    this.isTourOpen.set(false);
    if (this.videoRef) {
      const p = this.videoRef.play();
      if (p) p.catch(() => {});
    }
  }

  nextVideo(): void {
    const wasPlaying = this.tourVideoPlaying();
    this.currentVideoIndex.update(i => (i + 1) % this.tourVideos.length);
    if (wasPlaying) {
      // Need a tiny delay for Angular to render the new URL and OnChanges to fire
      setTimeout(() => this.playTourVideoForce(), 50);
    } else {
      this.tourVideoPlaying.set(false);
    }
  }

  prevVideo(): void {
    const wasPlaying = this.tourVideoPlaying();
    this.currentVideoIndex.update(i => (i === 0 ? this.tourVideos.length - 1 : i - 1));
    if (wasPlaying) {
      setTimeout(() => this.playTourVideoForce(), 50);
    } else {
      this.tourVideoPlaying.set(false);
    }
  }

  private playTourVideoForce(): void {
    if (this.tourVideoRef) {
      this.tourVideoPlaying.set(true);
      const p = this.tourVideoRef.play();
      if (p) p.catch(() => this.tourVideoPlaying.set(false));
    }
  }

  @ViewChild('tourVideo') tourVideoRef?: VideoPlayerComponent;

  toggleTourVideoPlay(): void {
    if (this.tourVideoRef) {
      if (this.tourVideoPlaying()) {
        this.tourVideoPlaying.set(false);
        this.tourVideoRef.pause();
      } else {
        this.tourVideoPlaying.set(true); // Update UI instantly
        const p = this.tourVideoRef.play();
        if (p) p.catch(() => this.tourVideoPlaying.set(false));
      }
    }
  }

  waInputMessage = signal<string>('');

  toggleWaChat(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isWaChatOpen.update(v => !v);

    if (this.isWaChatOpen()) {
      this.isWaTyping.set(true);
      this.hasShownWelcome.set(false); // Reset animation so it plays every time
      setTimeout(() => {
        this.isWaTyping.set(false);
        this.hasShownWelcome.set(true);
      }, 1000); // Realistic 1 second typing delay
    } else {
      this.isWaTyping.set(false);
      this.waInputMessage.set(''); // Clear input on close
    }
  }

  prefillWaMessage(message: string): void {
    this.waInputMessage.set(message);
  }

  sendWaMessage(message: string): void {
    if (!message.trim()) return;
    const phone = '918108446040';
    const encoded = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    this.isWaChatOpen.set(false); // Close chat after sending
    this.waInputMessage.set('');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.splashSub = this.splashState.splashComplete$.subscribe(isComplete => {
        if (isComplete) {
          setTimeout(() => {
            if (this.videoRef) {
              this.videoRef.setMuted(true);
              const p = this.videoRef.play();
              if (p) p.catch(() => {});
              
              // We rely on the (playing) event in HTML to call onVideoReady instead of checking readyState
            }
          }, 50);
          
          this.animateEntrance();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
  }

  private animateEntrance(): void {
    // Initial states for elements that wait or depend on scroll
    gsap.set(['.hero__title-sub', '.hero__title-suffix'], { opacity: 0, y: 30, scale: 0.98 });
    gsap.set('.hero__actions', { opacity: 0, y: 30, scale: 0.98 });
    gsap.set('.hero__scroll-hint', { opacity: 0 });
    gsap.set(['.hero__video', '.hero__poster'], { scale: 1.15 });
    gsap.set(['.btn-floating-tour', '.btn-floating-whatsapp'], { autoAlpha: 0, scale: 0.8 });

    // 1. Initial Entrance Timeline
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero__title-brand',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' }
    )
    .to('.hero__title-suffix',
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' },
      '<0.1' // start 0.1s after brand starts
    )
    .to('.hero__title-sub',
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' },
      '<0.1' // start 0.1s after suffix starts
    )
    .to(['.btn-floating-tour', '.btn-floating-whatsapp'],
      { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'back.out(1.5)', stagger: 0.1 },
      '-=1.5' // fade in floating buttons before title-sub finishes
    )
    .to('.hero__scroll-hint',
      { opacity: 1, duration: 1.5, ease: 'sine.out' },
      '-=1.0'
    );

    // 2. Scroll-Driven Timeline (Pinning & Scrubbing)
    // Use NgZone runOutsideAngular if needed, but it's safe here since we're in component logic after splash.
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
            onLeave: () => {
              document.querySelector('.btn-floating-tour')?.classList.add('btn-floating-tour--scrolled');
              document.querySelector('.btn-floating-whatsapp')?.classList.add('btn-floating-whatsapp--scrolled');
            },
            onEnterBack: () => {
              document.querySelector('.btn-floating-tour')?.classList.remove('btn-floating-tour--scrolled');
              document.querySelector('.btn-floating-whatsapp')?.classList.remove('btn-floating-whatsapp--scrolled');
            }
          }
        });

        // Zoom out video continuously over the whole scroll
        scrollTl.to(['.hero__video', '.hero__poster'], {
          scale: 1.0,
          ease: 'none',
          duration: 1
        }, 0)
        
        // Fade out scroll hint when buttons start appearing
        .fromTo('.hero__scroll-hint', 
          { opacity: 1 },
          { opacity: 0, ease: 'none', duration: 0.2 },
          0.2
        )
        
        // Bring buttons up (like Sanjivani) early in the scroll
        .fromTo('.hero__actions', 
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, ease: 'sine.out', duration: 0.4 },
          0.2
        );

        ScrollTrigger.refresh();
      }, 100);
    });
  }
  scrollTo(fragment: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
