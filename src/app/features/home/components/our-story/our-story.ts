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

  @ViewChild('storyVideo') videoRef?: VideoPlayerComponent;

  readonly videoReady = signal(false);
  readonly storyHls = signal<string>(this.media.masterPlaylist('drone-shot_03'));
  readonly storyMp4 = signal<string>(this.media.fallbackMp4('drone-shot_03') + '#t=0.001');
  readonly storyPoster = signal<string>(this.media.poster('drone-shot_03'));

  ngOnDestroy(): void {
    this.splashSub?.unsubscribe();
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
            
            ScrollTrigger.refresh();
          }, 100);
        });
      }
    });
  }
}
