import {
  Component, ElementRef, inject, AfterViewInit, OnDestroy,
  ViewChild, signal, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

export interface ActivityMedia {
  type: 'img' | 'video';
  url: string;
  posterUrl?: string;
}

interface Activity {
  title: string;
  desc: string;
  timing?: string;
  media: ActivityMedia[];
  colspan: number;
}

@Component({
  selector: 'app-activities',
  templateUrl: './activities.html',
  styleUrl: './activities.css',
  standalone: true,
  imports: [CommonModule]
})
export class ActivitiesComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('track') trackRef!: ElementRef;

  readonly items: Activity[] = [
    {
      title: 'The Sanjivani Toy Train',
      desc: 'Free ride for every guest.',
      media: [
        {
          type: 'video',
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776505208/toy-train_mlxtoy.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776505208/toy-train_mlxtoy.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500378/IMG_9393_1_iiqpe9.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500375/IMG_9392_1_tnsm7d.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500372/IMG_9391_1_zemfrs.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500369/IMG_9390_1_ont8ak.jpg' }
      ],
      colspan: 2
    },
    {
      title: 'Fishing at Golden Hour',
      desc: 'Cast a line and enjoy the calm.',
      media: [
        { type: 'img', url: 'assets/images/activities/fishing.jpg' }
      ],
      colspan: 1
    },
    {
      title: 'Kayaking & Boating',
      desc: 'Glide on the lake smoothly.',
      media: [
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776516128/image_7_une50d.png' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500180/IMG20260110175042_a5umau.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500178/IMG20251205164424_m2btrh.jpg' }
      ],
      colspan: 1
    },
    {
      title: 'Hammock Gardens',
      desc: 'Ideal afternoon chill.',
      media: [
        {
          type: 'video',
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776504974/IMG_202603081155047.MOV_i9gx5a.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776504974/IMG_202603081155047.MOV_i9gx5a.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504223/IMG_9378_1_tvoocw.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504220/IMG_9376_1_ejrxgx.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504220/IMG_9373_1_asksaf.jpg' }
      ],
      colspan: 2
    },
    {
      title: 'Swimming Pool',
      desc: 'Luxury meets refreshing nature.',
      media: [
        { type: 'img', url: 'assets/images/activities/swimming.jpg' }
      ],
      colspan: 3
    },
    {
      title: 'Free Cycling',
      desc: 'Roam the property at your pace.',
      media: [
        {
          type: 'video',
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776499912/bicyle_video_w4tayg.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776499912/bicyle_video_w4tayg.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776516148/image_ytjusr.png' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776499918/IMG_9415_1_hvsfse.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776499922/IMG_9420_1_mzs6nf.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776499924/IMG_9421_1_bzwmj5.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776499931/IMG_9419_1_ocjxii.jpg' }
      ],
      colspan: 2
    },
    {
      title: 'Games',
      desc: 'Carrom, Archery, Badminton, and more.',
      media: [
        {
          type: 'video',
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776504762/IMG_202603081155044_vujwjn.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776504762/IMG_202603081155044_vujwjn.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500353/IMG_9408_1_bbacib.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500336/IMG_9405_1_vhvz7d.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500346/IMG_9406_1_l7aeor.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776500299/IMG_9385_1_bhfxdn.jpg' }
      ],
      colspan: 1
    },

    {
      title: 'Wooden Bridge',
      desc: 'Walk through the nature.',
      media: [
        { type: 'img', url: 'assets/images/activities/bonfire.jpg' }
      ],
      colspan: 2
    }
  ];

  /** Active slide index per real item */
  readonly activeSlides = signal<number[]>([]);
  /** Netflix buffer ready per real item */
  readonly videoReady = signal<boolean[]>([]);
  /** Mute state per real item — all start muted */
  readonly mutedState = signal<boolean[]>([]);

  private videoObserver?: IntersectionObserver;
  private scrollTimeout: any;

  constructor() {
    const len = this.items.length;
    this.activeSlides.set(new Array(len).fill(0));
    this.videoReady.set(new Array(len).fill(false));
    this.mutedState.set(new Array(len).fill(true));
  }

  /** Create 4 sets for infinite loop illusion */
  get loopItems() {
    return [...this.items, ...this.items, ...this.items, ...this.items];
  }

  /** Strip loop offset to get the real item index */
  realIndex(loopIndex: number): number {
    return loopIndex % this.items.length;
  }

  /** Fired by (playing) and (canplay) — marks the video as buffered and ready */
  onVideoCanPlay(ri: number): void {
    this.videoReady.update(arr => {
      const n = [...arr];
      n[ri] = true;
      return n;
    });
  }

  /** Toggle mute for this card across ALL loop copies */
  toggleMute(ri: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.mutedState.update(arr => {
      const n = [...arr];
      n[ri] = !n[ri];
      return n;
    });
    // Apply to every looped copy's video so they stay in sync
    const allCards = this.trackRef.nativeElement
      .querySelectorAll(`[data-activity-idx="${ri}"]`) as NodeListOf<HTMLElement>;
    allCards.forEach(card => {
      const vid = card.querySelector('video') as HTMLVideoElement | null;
      if (vid) vid.muted = this.mutedState()[ri];
    });
  }

  nextImage(ri: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeSlides.update(arr => {
      const n = [...arr];
      n[ri] = (n[ri] + 1) % this.items[ri].media.length;
      return n;
    });
  }

  prevImage(ri: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeSlides.update(arr => {
      const n = [...arr];
      n[ri] = (n[ri] - 1 + this.items[ri].media.length) % this.items[ri].media.length;
      return n;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      if (this.trackRef?.nativeElement) {
        const track = this.trackRef.nativeElement;
        // Start at 2nd set for infinite illusion
        track.scrollTo({ left: track.scrollWidth / 4, behavior: 'instant' });
      }
      this.setupVideoObserver();
    }, 100);
  }

  /**
   * IntersectionObserver — plays videos only when they scroll into view
   * (horizontal carousel needs IO, not GSAP ScrollTrigger which is vertical-only)
   */
  private setupVideoObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    this.videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target as HTMLElement;
        const vid = card.querySelector('video') as HTMLVideoElement | null;
        if (!vid) return;
        if (entry.isIntersecting) {
          vid.muted = true;
          vid.play().catch(() => {/* blocked — user will trigger on interaction */ });
        } else {
          vid.pause();
        }
      });
    }, {
      root: this.trackRef.nativeElement, // observe inside the horizontal scroll track
      threshold: 0.4
    });

    const cards = this.trackRef.nativeElement
      .querySelectorAll('.activity-card') as NodeListOf<HTMLElement>;
    cards.forEach(card => this.videoObserver!.observe(card));
  }

  ngOnDestroy(): void {
    this.videoObserver?.disconnect();
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
  }

  scrollPrev(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.trackRef?.nativeElement) {
      const track = this.trackRef.nativeElement;
      const cardWidth = track.querySelector('.activity-card')?.offsetWidth || 300;
      const gap = parseInt(getComputedStyle(track).gap) || 16;
      track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      setTimeout(() => this.checkInfiniteScroll(track), 600);
    }
  }

  scrollNext(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.trackRef?.nativeElement) {
      const track = this.trackRef.nativeElement;
      const cardWidth = track.querySelector('.activity-card')?.offsetWidth || 300;
      const gap = parseInt(getComputedStyle(track).gap) || 16;
      track.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
      setTimeout(() => this.checkInfiniteScroll(track), 600);
    }
  }

  onNativeScroll(event: Event): void {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    const track = event.target as HTMLElement;
    this.scrollTimeout = setTimeout(() => this.checkInfiniteScroll(track), 250);
  }

  checkInfiniteScroll(track: HTMLElement): void {
    const oneSetWidth = track.scrollWidth / 4;
    if (track.scrollLeft > oneSetWidth * 2.5) {
      track.scrollTo({ left: track.scrollLeft - oneSetWidth, behavior: 'instant' });
    }
    if (track.scrollLeft < oneSetWidth * 0.5) {
      track.scrollTo({ left: track.scrollLeft + oneSetWidth, behavior: 'instant' });
    }
  }
}
