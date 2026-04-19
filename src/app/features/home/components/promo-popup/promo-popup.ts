import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promo-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="promo-backdrop" *ngIf="isVisible" (click)="closePopup()">
      <div class="promo-container" #promoContainer (click)="$event.stopPropagation()">
        
        <button class="promo-btn close-btn" (click)="closePopup()" aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="promo-media-wrap">
          <!-- Netflix style crossfade: Poster loads instantly, video fades in when ready -->
          <img src="https://res.cloudinary.com/dsepjvm2l/video/upload/v1776504340/Video_from_Siddharth_Thakur_x22z3x.jpg" 
               alt="Loading video..." 
               class="promo-poster"
               [class.hidden]="videoReady">
               
          <video #promoVideo 
                 src="https://res.cloudinary.com/dsepjvm2l/video/upload/v1776504340/Video_from_Siddharth_Thakur_x22z3x.mp4" 
                 playsinline 
                 loop 
                 [muted]="isMuted"
                 class="promo-video"
                 [class.ready]="videoReady"
                 (playing)="onVideoReady()"
                 (canplay)="onVideoReady()"
                 preload="auto">
          </video>
        </div>

        <div class="promo-controls">
          <button class="promo-btn mute-btn" (click)="toggleMute()" aria-label="Toggle Mute">
            <svg *ngIf="isMuted" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <svg *ngIf="!isMuted" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
          
          <button class="promo-btn fullscreen-btn" (click)="toggleFullscreen()" aria-label="Fullscreen">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .promo-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .promo-container {
      position: relative;
      width: 85%;
      max-width: 400px;
      aspect-ratio: 9/16;
      max-height: 85vh; /* Ensure it never surpasses screen height */
      background: #000;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
    }

    /* Remove the mobile media query that forced it full screen, keeping it as a popup */

    .promo-media-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      background: #000;
    }

    .promo-poster, .promo-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 1s ease-in-out;
    }

    .promo-poster {
      z-index: 1;
    }

    .promo-poster.hidden {
      opacity: 0;
    }

    .promo-video {
      z-index: 2;
      opacity: 0;
    }

    .promo-video.ready {
      opacity: 1;
    }

    .promo-btn {
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      backdrop-filter: blur(4px);
      transition: background 0.3s ease, transform 0.2s ease;
      z-index: 10;
    }

    .promo-btn:hover {
      background: rgba(0, 0, 0, 0.7);
      transform: scale(1.05);
    }

    .close-btn {
      top: 16px;
      right: 16px;
    }

    .promo-controls {
      position: absolute;
      bottom: 24px;
      right: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 10;
    }

    .mute-btn, .fullscreen-btn {
      position: relative;
    }
  `]
})
export class PromoPopupComponent implements OnInit, AfterViewInit {
  @ViewChild('promoVideo') promoVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('promoContainer') promoContainer!: ElementRef<HTMLDivElement>;
  
  isVisible = true;
  isMuted = true;
  videoReady = false;
  private isBrowser: boolean;
  private sub?: Subscription;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private splashState: SplashStateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Popup always visible on load/refresh initially
  }

  ngAfterViewInit() {
    if (this.isBrowser && this.isVisible && this.promoVideo) {
      // Wait for splash screen to finish before playing
      this.sub = this.splashState.splashComplete$.subscribe(isComplete => {
        if (isComplete) {
          this.playVideo();
        }
      });
    }
  }

  private playVideo() {
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.play().catch((err) => {
        console.warn('Autoplay prevented', err);
      });
    }
  }

  onVideoReady() {
    this.videoReady = true;
  }

  closePopup() {
    this.isVisible = false;
    if (this.promoVideo) {
      this.promoVideo.nativeElement.pause();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  toggleFullscreen() {
    // Request fullscreen on the container instead of video so controls stay visible, 
    // unless on iOS where container fullscreen might fail, fallback to video.
    const container = this.promoContainer?.nativeElement as any;
    const videoElem = this.promoVideo?.nativeElement as any;
    
    if (!container || !videoElem) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (videoElem.webkitEnterFullscreen) {
        videoElem.webkitEnterFullscreen(); // iOS Safari fallback
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (videoElem.requestFullscreen) {
        videoElem.requestFullscreen(); // generic fallback to video
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  }
}
