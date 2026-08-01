import {
  Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, inject, ElementRef, AfterViewInit, NgZone, signal, OnDestroy, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { ngSkipHydration: 'true' },
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private splashState = inject(SplashStateService);
  private splashSub?: Subscription;

  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;

  readonly videoReady = signal(false);
  // Appending #t=0.001 is a legendary fix for Chrome's cached MP4 freeze bug, 
  // forcing the media pipeline to initialize the demuxer correctly.
  readonly videoUrl = signal<string>('https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1785523935/DJI_0018_-_Trim_lrd183.mp4#t=0.001');

  onVideoReady(): void {
    this.videoReady.set(true);
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
