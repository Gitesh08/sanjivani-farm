import { Component, ChangeDetectionStrategy, ElementRef, inject, AfterViewInit, PLATFORM_ID, signal, OnDestroy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

interface Review {
  name: string;
  source: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
  standalone: true
})
export class ReviewsComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  
  readonly activeIndex = signal(0);
  private intervalId: any;

  readonly reviews: Review[] = [
    {
      name: 'Priya Sharma',
      source: 'Google Reviews',
      text: 'Absolutely enchanting! The architecture and integration with nature is brilliant. Everything feels premium yet incredibly grounding. Best weekend getaway from Mumbai.',
      rating: 5
    },
    {
      name: 'Rohan Desai',
      source: 'TripAdvisor',
      text: 'The hospitality is unmatched. From the evening bonfires to the pristine swimming pool surrounded by lush greenery, every moment felt like a living canvas.',
      rating: 5
    },
    {
      name: 'Amit & Neha',
      source: 'Google Reviews',
      text: 'Our kids loved the toy train and cycling around the farm. As adults, the hammock gardens and quiet sunsets by the lake were exactly the reset we needed.',
      rating: 5
    }
  ];

  next(): void {
    this.activeIndex.update(i => (i + 1) % this.reviews.length);
    this.resetInterval();
  }

  prev(): void {
    this.activeIndex.update(i => (i - 1 + this.reviews.length) % this.reviews.length);
    this.resetInterval();
  }

  resetInterval(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.activeIndex.update(i => (i + 1) % this.reviews.length);
      }, 3000);
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.resetInterval();

    const sectionInner = this.el.nativeElement.querySelector('.reviews__inner');
    if (sectionInner) {
      animateSectionTitle('.reviews__label, .reviews__title, .reviews__tag', sectionInner);
      animateScrollReveal('.reviews__carousel', sectionInner, 0.15);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
