import {
  Component, OnInit, OnDestroy, AfterViewInit, ElementRef,
  ChangeDetectionStrategy, PLATFORM_ID, inject, signal, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animateFadeLeft, animateFadeRight, animateSectionTitle, animateParallaxY } from '../../../../shared/utils/gsap-animations';

@Component({
  selector: 'app-our-story',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.css',
  host: { ngSkipHydration: 'true' },
})
export class OurStoryComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);

  readonly slides = [
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530402/image_ucfeks.png', alt: 'Sanjivani Farm lush greenery' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530497/download_14_j3juv1.jpg', alt: 'Nature scenery at Sanjivani Farm' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500316/IMG20260215125824_acfgbw.jpg', alt: 'Sanjivani Farm landscape' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500180/IMG20260110175042_a5umau.jpg', alt: 'Kayaking at Sanjivani Farm' },
  ];

  currentSlide = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlider();
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const section = this.el.nativeElement.querySelector('.our-story__section');
    animateSectionTitle('.our-story__label, .our-story__title', section);
    animateFadeLeft('.our-story__image-wrap', section, 0.2);
    animateFadeRight('.our-story__content', section, 0.4);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private startSlider(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.currentSlide.update(i => (i + 1) % this.slides.length);
      }, 2000);
    });
  }
}
