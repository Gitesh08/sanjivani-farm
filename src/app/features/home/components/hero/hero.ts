import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, inject, signal, NgZone } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Subscription } from 'rxjs';
import { VideoPlayerComponent } from '../../../../shared/components/video-player/video-player.component';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { MediaService } from '../../../../core/services/media.service';
import { TourService } from '../../../../core/services/tour.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { ngSkipHydration: 'true' },
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private splashState = inject(SplashStateService);
  public media = inject(MediaService);
  private tourService = inject(TourService);
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

  openTour(): void {
    this.tourService.openTour();
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
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    // Initial states for elements that wait or depend on scroll
    gsap.set(['.hero__title-sub', '.hero__title-suffix'], { opacity: 0, y: 30, scale: 0.98 });
    gsap.set('.hero__actions', { opacity: 0, y: 30, scale: 0.98 });
    gsap.set('.hero__scroll-hint', { opacity: 0 });
    gsap.set(['.hero__video', '.hero__poster'], { scale: 1.15 });
    if (isDesktop) {
      gsap.set(['.btn-floating-tour', '.btn-floating-whatsapp'], { autoAlpha: 0, scale: 0.8 });
    }

    // 1. Initial Entrance Timeline
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero__title-brand',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' }
    )
    .to('.hero__title-suffix',
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' },
      '<0.1'
    )
    .to('.hero__title-sub',
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' },
      '<0.1'
    );

    if (isDesktop) {
      tl.to(['.btn-floating-tour', '.btn-floating-whatsapp'],
        { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'back.out(1.5)', stagger: 0.1 },
        '-=1.5'
      );
    }

    tl.to('.hero__scroll-hint',
      { opacity: 1, duration: 1.5, ease: 'sine.out' },
      '-=1.0'
    );

    // 2. Scroll-Driven Timeline (Pinning & Scrubbing)
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
        
        // Bring buttons up early in the scroll
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
