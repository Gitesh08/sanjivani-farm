import { 
  Component, 
  ChangeDetectionStrategy, 
  ElementRef, 
  inject, 
  AfterViewInit, 
  PLATFORM_ID, 
  signal, 
  ViewChild, 
  NgZone, 
  HostListener 
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';
import rawReviews from '../../../../../assets/data/reviews.json';
import rawSummary from '../../../../../assets/data/reviews-summary.json';

export interface Review {
  name: string;
  source: string;
  text: string;
  rating: number;
  profile_photo_url: string;
  relative_time_description: string;
  badge?: string;
  tag?: string;
  highlight?: string;
}

const defaultReviews: Review[] = rawReviews.map((item: any) => ({
  name: item.author?.name || 'Guest',
  source: 'Google Maps',
  text: item.review?.text || '',
  rating: item.review?.rating || 5,
  profile_photo_url: item.author?.profile_url || '',
  relative_time_description: item.time?.published || 'recently',
  badge: item.author?.badge || 'Verified Guest',
  tag: item.review?.tag || 'Family Farm Stay',
  highlight: item.review?.highlight || ''
})).filter(r => r.rating >= 4 && r.text?.length > 10);

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class ReviewsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  @ViewChild('reviewsTrack') trackRef?: ElementRef<HTMLDivElement>;

  readonly reviews = signal<Review[]>(defaultReviews);
  readonly expandedReviews = signal<Set<string>>(new Set());
  readonly activeIndex = signal(0);
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(true);
  readonly rating = signal<number>(rawSummary?.rating || 4.4);
  readonly userRatingsTotal = signal<number>(rawSummary?.userRatingsTotal || 500);

  private readonly avatarColors = [
    '#105B85', // Deep Ocean Teal
    '#087592', // Warm Cyan
    '#2E7D32', // Lush Garden Green
    '#C05621', // Terracotta Warm
    '#4A5568', // Slate Stone
    '#2B6CB0'  // Sky Cobalt
  ];

  getInitials(name: string): string {
    if (!name) return 'G';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  getAvatarBg(name: string): string {
    if (!name) return this.avatarColors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.avatarColors.length;
    return this.avatarColors[index];
  }

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
  }

  scrollPrev(): void {
    if (!this.trackRef?.nativeElement) return;
    const track = this.trackRef.nativeElement;
    const cardWidth = track.querySelector<HTMLElement>('.review-card')?.offsetWidth || 340;
    track.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
  }

  scrollNext(): void {
    if (!this.trackRef?.nativeElement) return;
    const track = this.trackRef.nativeElement;
    const cardWidth = track.querySelector<HTMLElement>('.review-card')?.offsetWidth || 340;
    track.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.onTrackScroll();
    }
  }

  onTrackScroll(): void {
    if (!this.trackRef?.nativeElement) return;
    const track = this.trackRef.nativeElement;
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const total = this.reviews().length;

    this.canScrollPrev.set(scrollLeft > 10);
    this.canScrollNext.set(scrollLeft < maxScroll - 10);

    if (total <= 1 || maxScroll <= 0) {
      this.activeIndex.set(0);
      return;
    }

    // Proportional scroll position ensures the last dot is active at the end on desktop & mobile
    if (scrollLeft >= maxScroll - 15) {
      this.activeIndex.set(total - 1);
    } else if (scrollLeft <= 15) {
      this.activeIndex.set(0);
    } else {
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * (total - 1));
      this.activeIndex.set(Math.min(Math.max(index, 0), total - 1));
    }
  }

  scrollToIndex(index: number): void {
    if (!this.trackRef?.nativeElement) return;
    const track = this.trackRef.nativeElement;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const total = this.reviews().length;
    if (total <= 1 || maxScroll <= 0) return;

    // Smooth scroll to the corresponding fraction of the carousel track
    const targetScroll = (index / (total - 1)) * maxScroll;
    track.scrollTo({ left: targetScroll, behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.onTrackScroll();

    const sectionInner = this.el.nativeElement.querySelector('.reviews__inner');
    if (sectionInner) {
      animateSectionTitle('.reviews__label, .reviews__title, .reviews__tag, .reviews__google-badge', sectionInner);
      animateScrollReveal('.reviews__carousel-wrapper', sectionInner, 0.15);
    }
  }
}
