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

export interface SubRatings {
  rooms?: number;
  service?: number;
  location?: number;
}

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
  subRatings?: SubRatings | null;
  hotelHighlights?: string[];
  tripType?: string;
  travelGroup?: string;
}

/**
 * Robust parser & beautifier that cleans raw scraped Google Maps review text,
 * separates concatenated metadata (Rooms, Service, Location, Trip Type, Highlights),
 * and structures paragraphs / Pros / Cons gracefully.
 */
export function parseAndBeautifyGoogleReview(rawText: string): {
  cleanText: string;
  subRatings: SubRatings | null;
  hotelHighlights: string[];
  tripType: string;
  travelGroup: string;
} {
  if (!rawText) {
    return { cleanText: '', subRatings: null, hotelHighlights: [], tripType: '', travelGroup: '' };
  }

  let text = rawText;
  const subRatings: SubRatings = {};
  let hotelHighlights: string[] = [];
  let tripType = '';
  let travelGroup = '';

  // Extract Trip type (e.g. Trip typeHoliday or Trip type: Holiday)
  const tripMatch = text.match(/Trip type:?\s*([A-Za-z\s]+?)(?=(Travel group|Rooms:|Service:|Location:|Hotel highlights|$))/i);
  if (tripMatch) tripType = tripMatch[1].trim();

  // Extract Travel group (e.g. Travel groupFamily or Travel group: Family)
  const groupMatch = text.match(/Travel group:?\s*([A-Za-z\s]+?)(?=(Trip type|Rooms:|Service:|Location:|Hotel highlights|$))/i);
  if (groupMatch) travelGroup = groupMatch[1].trim();

  // Extract Sub-ratings (Rooms: 5, Service: 5, Location: 5)
  const roomsMatch = text.match(/Rooms:\s*(\d+)/i);
  if (roomsMatch) subRatings.rooms = parseInt(roomsMatch[1], 10);

  const serviceMatch = text.match(/Service:\s*(\d+)/i);
  if (serviceMatch) subRatings.service = parseInt(serviceMatch[1], 10);

  const locMatch = text.match(/Location:\s*(\d+)/i);
  if (locMatch) subRatings.location = parseInt(locMatch[1], 10);

  // Extract Hotel highlights (e.g. Hotel highlightsGreat view, Quiet, Child-friendly)
  const highMatch = text.match(/Hotel highlights:?\s*(.+?)$/i);
  if (highMatch) {
    hotelHighlights = highMatch[1]
      .split(/,\s*/)
      .map(s => s.trim())
      .filter(Boolean);
  }

  // Remove the concatenated metadata block from the body text
  const metaRegex = /(?:Trip type|Travel group|Rooms:\s*\d|Hotel highlights)/i;
  const idx = text.search(metaRegex);
  if (idx !== -1) {
    text = text.slice(0, idx).trim();
  }

  // Beautify Pros & Cons: ensure clear spacing and separate paragraphs
  text = text.replace(/([^\n])\s*(Cons:?)/gi, '$1\n\nCons:');
  text = text.replace(/([^\n])\s*(Pros:?)/gi, '$1\n\nPros:');

  // Space out sentences stuck together without a space (e.g. "sure.Staff" -> "sure. Staff")
  text = text.replace(/([a-zA-Z])([.!?])([A-Z])/g, '$1$2 $3');

  return {
    cleanText: text.trim(),
    subRatings: Object.keys(subRatings).length ? subRatings : null,
    hotelHighlights,
    tripType,
    travelGroup
  };
}

const defaultReviews: Review[] = rawReviews.map((item: any) => {
  const rawText = item.review?.text || '';
  const parsed = parseAndBeautifyGoogleReview(rawText);
  const tag = parsed.travelGroup 
    ? (parsed.travelGroup.toLowerCase().includes('stay') ? parsed.travelGroup : `${parsed.travelGroup} Stay`)
    : (item.review?.tag || 'Family Farm Stay');

  return {
    name: item.author?.name || 'Guest',
    source: 'Google Maps',
    text: parsed.cleanText || item.review?.text || '',
    rating: item.review?.rating || 5,
    profile_photo_url: item.author?.profile_url || '',
    relative_time_description: item.time?.published || 'recently',
    badge: item.author?.badge || 'Verified Guest',
    tag,
    highlight: parsed.hotelHighlights[0] || item.review?.highlight || '',
    subRatings: parsed.subRatings || item.review?.subRatings || null,
    hotelHighlights: parsed.hotelHighlights?.length ? parsed.hotelHighlights : (item.review?.hotelHighlights || []),
    tripType: parsed.tripType || item.review?.tripType || '',
    travelGroup: parsed.travelGroup || item.review?.travelGroup || ''
  };
}).filter(r => r.rating >= 4 && r.text?.length > 10);

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

  toggleExpand(reviewName: string, event?: Event): void {
    const wasExpanded = this.expandedReviews().has(reviewName);

    // If collapsing or expanding, ensure the review text scroll position is reset to the top
    if (event) {
      const btn = event.currentTarget as HTMLElement | null;
      const card = btn?.closest('.review-card');
      const textEl = card?.querySelector<HTMLElement>('.review-card__text');
      if (textEl) {
        textEl.scrollTop = 0;
      }
    }

    this.expandedReviews.update(set => {
      const newSet = new Set(set);
      if (newSet.has(reviewName)) {
        newSet.delete(reviewName);
      } else {
        newSet.add(reviewName);
      }
      return newSet;
    });

    // When collapsing ("Show less"), guarantee text scroll returns to top and card remains in view
    if (wasExpanded && event) {
      const btn = event.currentTarget as HTMLElement | null;
      const card = btn?.closest('.review-card');
      setTimeout(() => {
        if (card) {
          const textEl = card.querySelector<HTMLElement>('.review-card__text');
          if (textEl) {
            textEl.scrollTop = 0;
          }
          // Smoothly keep the card in view without jarring jumps
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }, 0);
    }
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
