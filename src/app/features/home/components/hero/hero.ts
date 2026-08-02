import {
  Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, inject, ElementRef, AfterViewInit, NgZone, signal, OnDestroy, ViewChild
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
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
  private splashSub?: Subscription;

  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;

  readonly videoReady = signal(false);
  // Appending #t=0.001 is a legendary fix for Chrome's cached MP4 freeze bug, 
  // forcing the media pipeline to initialize the demuxer correctly.
  readonly videoUrl = signal<string>('https://res.cloudinary.com/dsepjvm2l/video/upload/v1785651251/kayaking-boat-3_fsojzp.mp4#t=0.001');

  onVideoReady(): void {
    this.videoReady.set(true);
  }

  // 360 Aerial Tour State
  readonly isTourOpen = signal(false);
  readonly currentVideoIndex = signal(0);
  
  readonly tourVideos = [
    {
      url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785529662/VN20260730_193435_asxyre.mp4',
      poster: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1785529662/VN20260730_193435_asxyre.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785529696/VN20260730_192651_zijlum.mp4',
      poster: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1785529696/VN20260730_192651_zijlum.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785529693/VN20260730_193050_m2uvzl.mp4',
      poster: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1785529693/VN20260730_193050_m2uvzl.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785529716/VN20260730_192230_kqdwvo.mp4',
      poster: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1785529716/VN20260730_192230_kqdwvo.jpg'
    },
    {
      url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785529722/VN20260730_194051_eaqemg.mp4',
      poster: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1785529722/VN20260730_194051_eaqemg.jpg'
    }
  ];

  openTour(): void {
    this.currentVideoIndex.set(0);
    this.isTourOpen.set(true);
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.pause();
    }
  }

  closeTour(): void {
    this.isTourOpen.set(false);
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.play().catch(() => {});
    }
  }

  nextVideo(): void {
    this.currentVideoIndex.update(i => (i + 1) % this.tourVideos.length);
  }

  prevVideo(): void {
    this.currentVideoIndex.update(i => (i === 0 ? this.tourVideos.length - 1 : i - 1));
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
            if (this.videoRef?.nativeElement) {
              const vid = this.videoRef.nativeElement;
              // Chrome requires explicit JS muted state sometimes to fulfill play() promises
              vid.muted = true;
              vid.play().catch(() => {});
              
              if (vid.readyState >= 3) {
                this.onVideoReady();
              }
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
    gsap.set('.hero__title-sub', { opacity: 0, y: 30, scale: 0.98 });
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
    .to('.hero__title-sub',
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' },
      '<0.15' // start 0.15s after brand starts (almost immediately)
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
