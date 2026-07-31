import { Component, ChangeDetectionStrategy, ElementRef, inject, AfterViewInit, PLATFORM_ID, signal, OnDestroy, NgZone, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';
import rawReviews from '../../../../../assets/data/reviews.json';

interface Review {
  name: string;
  source: string;
  text: string;
  rating: number;
  profile_photo_url?: string;
  relative_time_description?: string;
}

const defaultReviews = rawReviews.map((item: any) => ({
  name: item.author?.name || 'Guest',
  source: 'Google',
  text: item.review?.text || '',
  rating: item.review?.rating || 5,
  profile_photo_url: item.author?.profile_url,
  relative_time_description: item.time?.published
})).filter(r => r.rating >= 4 && r.text?.length > 10).slice(0, 10);

@Component({
  selector: 'app-reviews',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
  standalone: true
})
export class ReviewsComponent implements AfterViewInit, OnDestroy, OnInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  
  readonly activeIndex = signal(0);
  private intervalId: any;

  readonly reviews = signal<Review[]>(defaultReviews.length > 0 ? defaultReviews : [
    {
      name: 'Priya Sharma',
      source: 'Google Reviews',
      text: 'Absolutely enchanting! The architecture and integration with nature is brilliant. Everything feels premium yet incredibly grounding. Best weekend getaway from Mumbai.',
      rating: 5,
      relative_time_description: '2 weeks ago'
    }
  ]);

  readonly expandedReviews = signal<Set<string>>(new Set());

  toggleExpand(reviewName: string): void {
    this.expandedReviews.update(set => {
      const newSet = new Set(set);
      if (newSet.has(reviewName)) {
        newSet.delete(reviewName);
      } else {
        newSet.add(reviewName);
      }
      return newSet;
    });
    
    // Pause auto-rotation when reading, resume when closed
    if (this.expandedReviews().size > 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    } else {
      this.resetInterval();
    }
  }

  ngOnInit() {
    // No fetch needed, loaded synchronously
  }

  next(): void {
    this.expandedReviews.set(new Set());
    this.activeIndex.update(i => (i + 1) % this.reviews().length);
    this.resetInterval();
  }

  prev(): void {
    this.expandedReviews.set(new Set());
    this.activeIndex.update(i => (i - 1 + this.reviews().length) % this.reviews().length);
    this.resetInterval();
  }

  resetInterval(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.expandedReviews.set(new Set());
        this.activeIndex.update(i => (i + 1) % this.reviews().length);
      }, 6000);
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
