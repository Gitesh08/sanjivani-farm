import {
  Component, AfterViewInit, ElementRef, OnDestroy,
  ChangeDetectionStrategy, PLATFORM_ID, inject, NgZone, ViewChild, signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSectionTitle } from '../../../../shared/utils/gsap-animations';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-our-story',
  imports: [RouterLink],
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

            animateSectionTitle('.our-story__label, .our-story__title', section);

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

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
  }
}
