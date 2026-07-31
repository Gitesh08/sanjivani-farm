import {
  Component, OnInit, ChangeDetectionStrategy, PLATFORM_ID, inject, ElementRef, AfterViewInit, NgZone, signal, OnDestroy, ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

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
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero__title',
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 2.5, ease: 'sine.out' }
    )
    .fromTo('.hero__actions',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 2.0, ease: 'sine.out' },
      '-=1.5'
    )
    .fromTo('.hero__scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'sine.out' },
      '-=1.0'
    );
  }
  scrollTo(fragment: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
