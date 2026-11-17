import {
  Component, AfterViewInit, ElementRef, OnDestroy,
  ChangeDetectionStrategy, PLATFORM_ID, inject, NgZone, ViewChild, signal
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSectionTitle } from '../../../../shared/utils/gsap-animations';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { MediaService } from '../../../../core/services/media.service';
import { VideoPlayerComponent } from '../../../../shared/components/video-player/video-player.component';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-our-story',
  imports: [RouterLink, CommonModule, VideoPlayerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
  host: { ngSkipHydration: 'true' },
})
export class OurStoryComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  private splashState = inject(SplashStateService);
  public media = inject(MediaService);
  private splashSub?: Subscription;
  private triggers: ScrollTrigger[] = [];
  private counterTweens: gsap.core.Tween[] = [];

  @ViewChild('storyVideo') videoRef?: VideoPlayerComponent;

  readonly videoReady = signal(false);
  readonly storyHls = signal<string>(this.media.masterPlaylist('drone-shot_03'));
  readonly storyMp4 = signal<string>(this.media.fallbackMp4('drone-shot_03') + '#t=0.001');
  readonly storyPoster = signal<string>(this.media.poster('drone-shot_03'));

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
    this.counterTweens.forEach(t => t.kill());
    this.triggers.forEach(t => t.kill());
  }

  // Play State
  readonly isPlaying = signal(false);

  togglePlay(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!this.videoRef) return;
    
    if (this.isPlaying()) {
      this.videoRef.pause();
      this.isPlaying.set(false);
    } else {
      this.videoRef.play();
      this.isPlaying.set(true);
    }
  }

  // Mute State
  readonly isMuted = signal(true);

  toggleMute(event: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isMuted.update(v => !v);
    if (this.videoRef) {
      this.videoRef.setMuted(this.isMuted());
    }
  }

  // 360 Aerial Tour State
  readonly isTourOpen = signal(false);
  readonly currentVideoIndex = signal(0);
  
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
    if (this.videoRef && this.isPlaying()) {
      this.videoRef.pause();
      this.isPlaying.set(false);
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
    this.currentVideoIndex.update(i => (i + 1) % this.tourVideos.length);
  }

  prevVideo(): void {
    this.currentVideoIndex.update(i => (i === 0 ? this.tourVideos.length - 1 : i - 1));
  }

  onVideoReady(): void {
    this.videoReady.set(true);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.splashSub = this.splashState.splashComplete$.subscribe(isComplete => {
      if (isComplete) {

        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            const section = this.el.nativeElement.querySelector('.our-story__section');
            const imageOuter = this.el.nativeElement.querySelector('.our-story__image-outer');
            const content = this.el.nativeElement.querySelector('.our-story__content');
            const titles = this.el.nativeElement.querySelectorAll('.our-story__label, .our-story__title');

            if (section && titles.length) {
              animateSectionTitle(titles, section);
            }

            // Scrubbing animation for media (from left)
            gsap.fromTo(
              imageOuter,
              { x: -60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  end: 'center 60%',
                  scrub: 1,
                }
              }
            );

            // Scrubbing animation for content (from right)
            gsap.fromTo(
              content,
              { x: 60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  end: 'center 60%',
                  scrub: 1,
                }
              }
            );

            this.initCounters();
            
            ScrollTrigger.refresh();
          }, 100);
        });
      }
    });
  }

  private initCounters(): void {
    const highlightsEl = this.el.nativeElement.querySelector('.our-story__highlights');
    const counters = this.el.nativeElement.querySelectorAll('.our-story__counter');
    const items = this.el.nativeElement.querySelectorAll('.our-story__highlight-item');

    if (!highlightsEl || !counters.length) return;

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Set initial text to '0' while waiting to scroll into view
    counters.forEach((c: HTMLElement) => {
      c.textContent = '0';
    });

    let hasCountedInView = false;
    let isAnimating = false;

    const startCounters = () => {
      if (isAnimating) return;
      isAnimating = true;

      this.counterTweens.forEach(t => t.kill());
      this.counterTweens = [];

      if (items.length) {
        gsap.fromTo(
          items,
          { y: 14, opacity: 0.6 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      }

      counters.forEach((counterEl: HTMLElement, index: number) => {
        const target = parseFloat(counterEl.dataset['target'] || '0');
        const countObj = { val: 0 };
        counterEl.textContent = '0';

        const tween = gsap.to(countObj, {
          val: target,
          duration: 1.7,
          delay: index * 0.08,
          ease: 'power2.out',
          onUpdate: () => {
            counterEl.textContent = Math.round(countObj.val).toString();
          },
          onComplete: () => {
            counterEl.textContent = target.toString();
            gsap.fromTo(
              counterEl,
              { scale: 1 },
              { scale: 1.1, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.inOut' }
            );

            if (index === counters.length - 1) {
              isAnimating = false;
            }
          }
        });

        this.counterTweens.push(tween);
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: highlightsEl,
      start: 'top 88%',
      end: 'bottom 10%',
      onEnter: () => {
        if (!hasCountedInView) {
          hasCountedInView = true;
          startCounters();
        }
      },
      onEnterBack: () => {
        if (!hasCountedInView) {
          hasCountedInView = true;
          startCounters();
        }
      },
      onLeave: () => {
        hasCountedInView = false;
        this.counterTweens.forEach(t => t.kill());
        isAnimating = false;
        counters.forEach((c: HTMLElement) => (c.textContent = '0'));
      },
      onLeaveBack: () => {
        hasCountedInView = false;
        this.counterTweens.forEach(t => t.kill());
        isAnimating = false;
        counters.forEach((c: HTMLElement) => (c.textContent = '0'));
      }
    });

    this.triggers.push(trigger);

    // If already in view upon init, trigger immediately
    if (trigger.progress > 0 && trigger.progress < 1) {
      hasCountedInView = true;
      startCounters();
    }
  }
}
