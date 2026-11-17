import { 
  Component, 
  ElementRef, 
  ViewChild, 
  AfterViewInit, 
  OnInit, 
  PLATFORM_ID, 
  Inject, 
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { SplashStateService } from '../../../core/services/splash-state.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="splash-wrapper" #splashWrap *ngIf="showSplash" (click)="finishSplash()">
      <div class="splash-content">
        <video #splashVideo
               class="splash-video"
               autoplay
               muted
               playsinline
               webkit-playsinline
               preload="auto"
               (ended)="finishSplash()"
               (error)="onVideoError()">
          <source src="/assets/clips/sanjivani-farm-splash-screen.webm" type="video/webm">
          <source src="/assets/clips/sanjivani-farm-splash-screen.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  `,
  styles: [`
    .splash-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      width: 100dvw;
      height: 100vh;
      height: 100dvh;
      background-color: #FFFFFF;
      z-index: 999999;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      user-select: none;
      touch-action: none;
      overscroll-behavior: none;
    }

    .splash-content {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .splash-video {
      /* Perfect aspect-ratio scaling across all devices */
      width: min(92vw, 880px);
      max-height: 80vh;
      height: auto;
      aspect-ratio: 16 / 9;
      object-fit: contain;
      background-color: #FFFFFF;
      display: block;
      transform: translateZ(0);
      will-change: transform, opacity;
    }

    @media (max-width: 600px) {
      .splash-video {
        width: 100vw;
        max-height: 70vh;
      }
    }
  `]
})
export class SplashScreenComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('splashWrap') splashWrap?: ElementRef<HTMLDivElement>;
  @ViewChild('splashVideo') splashVideo?: ElementRef<HTMLVideoElement>;
  
  showSplash = true;

  private isBrowser: boolean;
  private isFinishing = false;
  private fallbackTimer?: any;
  private isScrollLocked = false;

  private blockScroll = (e: Event): void => {
    e.preventDefault();
  };

  private blockKeys = (e: KeyboardEvent): void => {
    const keys = ['Space', ' ', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown'];
    if (keys.includes(e.key) || keys.includes(e.code)) {
      e.preventDefault();
    }
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef,
    private splashState: SplashStateService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.lockScroll();
    }
  }

  private lockScroll(): void {
    if (!this.isBrowser || typeof document === 'undefined' || this.isScrollLocked) return;
    this.isScrollLocked = true;

    // Pin viewport to top
    window.scrollTo(0, 0);

    // Apply strict overflow locks to both root and body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';

    // Intercept wheel, touch gestures, and keyboard navigation
    window.addEventListener('wheel', this.blockScroll, { passive: false });
    window.addEventListener('touchmove', this.blockScroll, { passive: false });
    window.addEventListener('keydown', this.blockKeys, { passive: false });
  }

  private unlockScroll(): void {
    if (!this.isBrowser || typeof document === 'undefined' || !this.isScrollLocked) return;
    this.isScrollLocked = false;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.overscrollBehavior = '';
    document.body.style.overscrollBehavior = '';

    window.removeEventListener('wheel', this.blockScroll);
    window.removeEventListener('touchmove', this.blockScroll);
    window.removeEventListener('keydown', this.blockKeys);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Safety fallback: if video is paused by browser power-saving or stalls, finish automatically
    this.fallbackTimer = setTimeout(() => {
      this.finishSplash();
    }, 6600);

    // Attempt video playback immediately
    setTimeout(() => {
      const video = this.splashVideo?.nativeElement;
      if (video) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            // Autoplay blocked by battery saver fallback gracefully
          });
        }
      }
    }, 50);

    // Ensure scroll lock is active
    this.lockScroll();
  }

  onVideoError(): void {
    console.warn('⚠️ Splash video could not be decoded. Falling back cleanly.');
    this.finishSplash();
  }

  finishSplash(): void {
    if (this.isFinishing) return;
    this.isFinishing = true;

    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = undefined;
    }

    const wrap = this.splashWrap?.nativeElement;
    const video = this.splashVideo?.nativeElement;

    if (!wrap) {
      this.closeSplash();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => this.closeSplash()
    });

    if (video) {
      tl.to(video, {
        opacity: 0,
        scale: 0.98,
        duration: 0.35,
        ease: 'power2.in'
      });
    }

    // Curtain lifts smoothly up to reveal the site
    tl.to(wrap, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power3.inOut'
    }, '-=0.15');
  }

  private closeSplash(): void {
    this.showSplash = false;
    this.unlockScroll();
    this.splashState.complete();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
    }
    this.unlockScroll();
  }
}
