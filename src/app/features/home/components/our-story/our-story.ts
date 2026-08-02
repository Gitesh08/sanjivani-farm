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
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-our-story',
  imports: [RouterLink, CommonModule],
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
  private splashSub?: Subscription;

  @ViewChild('storyVideo') videoRef?: ElementRef<HTMLVideoElement>;

  readonly videoReady = signal(false);
  readonly videoUrl = signal<string>('https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1200/v1785529662/VN20260730_193435_asxyre.mp4#t=0.001');

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
  }

  // Mute State
  readonly isMuted = signal(true);

  toggleMute(event: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isMuted.update(v => !v);
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.muted = this.isMuted();
    }
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

  onVideoReady(): void {
    this.videoReady.set(true);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.splashSub = this.splashState.splashComplete$.subscribe(isComplete => {
      if (isComplete) {
        // Explicitly play video to bypass browser autoplay restrictions
        setTimeout(() => {
          if (this.videoRef?.nativeElement) {
            const vid = this.videoRef.nativeElement;
            vid.muted = true;
            vid.play().catch(e => console.log('Video autoplay blocked:', e));
            
            if (vid.readyState >= 3) {
              this.onVideoReady();
            }
          }
        }, 50);
        
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
            
            ScrollTrigger.refresh();
          }, 100);
        });
      }
    });
  }
}
