import {
  Component, ElementRef, inject, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList, signal, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MediaService } from '../../../../core/services/media.service';
import { VideoPlayerComponent } from '../../../../shared/components/video-player/video-player.component';

export interface ActivityMedia {
  type: 'img' | 'video';
  url?: string;
  poster?: string;
  hls?: string;
  fallbackMp4?: string;
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
  imports: [CommonModule, VideoPlayerComponent]
})
export class ActivitiesComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  public media = inject(MediaService);

  @ViewChild('track') trackRef!: ElementRef;
  @ViewChildren(VideoPlayerComponent) videoPlayers!: QueryList<VideoPlayerComponent>;

  readonly items: Activity[] = [
    {
      title: 'The Sanjivani Toy Train',
      desc: 'A charming ride for every guest.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('toy-train'),
          hls: this.media.masterPlaylist('toy-train'),
          fallbackMp4: this.media.fallbackMp4('toy-train')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9393_1_inhxzy.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9392_1_fsi4gw.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9391_1_lqsyvu.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9390_1_cxhwtz.webp' }
      ],
      colspan: 2
    },
    {
      title: 'Kayaking & Boating',
      desc: 'Glide on the lake smoothly (Premium Activity).',
      media: [
        {
          type: 'video',
          poster: this.media.poster('boating_07'),
          hls: this.media.masterPlaylist('boating_07'),
          fallbackMp4: this.media.fallbackMp4('boating_07')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250528_164616219_ffglse.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250503_114017966_ufcr3p.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260110175042_q7wppr.webp' },
        {
          type: 'video',
          poster: this.media.poster('boating_06'),
          hls: this.media.masterPlaylist('boating_06'),
          fallbackMp4: this.media.fallbackMp4('boating_06')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20251205164424_dg7pra.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250503_114128353_hfnk9j.webp' },
        {
          type: 'video',
          poster: this.media.poster('boating_03'),
          hls: this.media.masterPlaylist('boating_03'),
          fallbackMp4: this.media.fallbackMp4('boating_03')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250816180940_01_o2tm7n.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250816180632_ajlawi.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250816175926_chdexo.webp' },
        {
          type: 'video',
          poster: this.media.poster('boating_04'),
          hls: this.media.masterPlaylist('boating_04'),
          fallbackMp4: this.media.fallbackMp4('boating_04')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250503_114131415_BURST000_COVER_TOP_mhtula.webp' }
      ],
      colspan: 1
    },
    {
      title: 'Hammock Gardens',
      desc: 'Ideal afternoon chill.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('hammock-garden'),
          hls: this.media.masterPlaylist('hammock-garden'),
          fallbackMp4: this.media.fallbackMp4('hammock-garden')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9379_1_qrdefg.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9376_1_eayc1u.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9373_1_lyomcw.webp' }
      ],
      colspan: 2
    },
    {
      title: 'Swimming Pool',
      desc: 'Luxury meets refreshing nature.',
      media: [
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6738_sdjzbg.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6744_awxmdu.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6737_zjvaxe.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20240628_145322839_aum997.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260703140302_owunwq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250221_111512440_HDR_idko0e.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20240721_151818569_HDR_crohyq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260703140328_zfewaq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20230715_122855574_HDR_ojixpt.webp' }
      ],
      colspan: 3
    },
    {
      title: 'Cycling',
      desc: 'Roam the property at your pace.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('cycling'),
          hls: this.media.masterPlaylist('cycling'),
          fallbackMp4: this.media.fallbackMp4('cycling')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9414_1_hw1kky.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9421_1_ln2qj9.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9419_1_izijdq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9420_1_xvjgtr.webp' }
      ],
      colspan: 2
    },
    {
      title: 'Games',
      desc: 'Cricket, Football, Rifle Shooting (Premium), Carrom, and more.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('gaming'),
          hls: this.media.masterPlaylist('gaming'),
          fallbackMp4: this.media.fallbackMp4('gaming')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9408_1_akjrz4.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9407_1_mjk4l4.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9405_1_kf7vkw.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9406_1_b1lfpn.webp' }
      ],
      colspan: 1
    },

    {
      title: 'Wooden Bridge',
      desc: 'Walk through the nature.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('wooden-bridge_01'),
          hls: this.media.masterPlaylist('wooden-bridge_01'),
          fallbackMp4: this.media.fallbackMp4('wooden-bridge_01')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250817093229_wpclwy.webp' },
        {
          type: 'video',
          poster: this.media.poster('wooden-bridge_02'),
          hls: this.media.masterPlaylist('wooden-bridge_02'),
          fallbackMp4: this.media.fallbackMp4('wooden-bridge_02')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20251209182411_w0an0l.webp' },
        {
          type: 'video',
          poster: this.media.poster('wooden-bridge_03'),
          hls: this.media.masterPlaylist('wooden-bridge_03'),
          fallbackMp4: this.media.fallbackMp4('wooden-bridge_03')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250817093413_jslqmb.webp' }
      ],
      colspan: 2
    },
    {
      title: 'Lawn Area',
      desc: 'Perfect for events, outdoor gatherings, and relaxation.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('lawn-area'),
          hls: this.media.masterPlaylist('lawn-area'),
          fallbackMp4: this.media.fallbackMp4('lawn-area')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260215125824_fycjy9.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9385_1_trwhsy.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9387_1_zlqxq8.webp' }
      ],
      colspan: 1
    },
    {
      title: 'Dining',
      desc: 'Authentic and delicious farm-fresh meals.',
      media: [
        {
          type: 'video',
          poster: this.media.poster('dinning'),
          hls: this.media.masterPlaylist('dinning'),
          fallbackMp4: this.media.fallbackMp4('dinning')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9409_1_kms5tq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9411_1_pjudpx.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9410_1_oanugf.webp' }
      ],
      colspan: 1
    }
  ];

  /** Active slide index per real item */
  readonly activeSlides = signal<number[]>([]);
  /** Netflix buffer ready per video (loopIdx-mi) */
  readonly videoReadySet = signal<Set<string>>(new Set());
  /** Playing state per video (loopIdx-mi) */
  readonly playingVideosSet = signal<Set<string>>(new Set());
  /** Mute state per real item — all start muted */
  readonly mutedState = signal<boolean[]>([]);

  private videoObserver?: IntersectionObserver;
  private scrollTimeout: any;

  constructor() {
    const len = this.items.length;
    this.activeSlides.set(new Array(len).fill(0));
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

  /** Fired by (playing) — marks the video as buffered and playing */
  onVideoPlay(loopIdx: number, mi: number): void {
    this.videoReadySet.update(s => new Set(s).add(`${loopIdx}-${mi}`));
    this.playingVideosSet.update(s => new Set(s).add(`${loopIdx}-${mi}`));
  }

  /** Fired by (pauseEvent) — marks the video as paused */
  onVideoPause(loopIdx: number, mi: number): void {
    this.playingVideosSet.update(s => {
      const newSet = new Set(s);
      newSet.delete(`${loopIdx}-${mi}`);
      return newSet;
    });
  }

  playVideo(loopIdx: number, mi: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.playingVideosSet.update(s => new Set(s).add(`${loopIdx}-${mi}`));
    const allCards = this.trackRef?.nativeElement?.querySelectorAll(`[data-loop-idx="${loopIdx}"]`) as NodeListOf<HTMLElement>;
    if (allCards?.length) {
      const card = allCards[0];
      const videoEl = card.querySelector(`[data-mi="${mi}"] video`) as HTMLVideoElement | null;
      if (videoEl) {
        videoEl.muted = this.mutedState()[loopIdx % this.items.length];
        videoEl.play().catch(e => {
          console.warn('[Activity] play failed:', e);
          this.playingVideosSet.update(s => { const ns = new Set(s); ns.delete(`${loopIdx}-${mi}`); return ns; });
        });
      }
    }
  }

  pauseVideo(loopIdx: number, mi: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.playingVideosSet.update(s => { const ns = new Set(s); ns.delete(`${loopIdx}-${mi}`); return ns; });
    const allCards = this.trackRef?.nativeElement?.querySelectorAll(`[data-loop-idx="${loopIdx}"]`) as NodeListOf<HTMLElement>;
    if (allCards?.length) {
      const videoEl = allCards[0].querySelector(`[data-mi="${mi}"] video`) as HTMLVideoElement | null;
      if (videoEl) videoEl.pause();
    }
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
      // Find app-video-player elements instead of native video
      // Since it's an angular component we can't call .muted easily via DOM.
      // But wait! We used Angular component binding `[muted]="mutedState()[ri]"` in the HTML!
      // So Angular will automatically update all instances! 
      // We don't need this manual DOM query anymore!
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
    this.syncCardVideos(ri);
  }

  prevImage(ri: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeSlides.update(arr => {
      const n = [...arr];
      n[ri] = (n[ri] - 1 + this.items[ri].media.length) % this.items[ri].media.length;
      return n;
    });
    this.syncCardVideos(ri);
  }

  private syncCardVideos(ri: number): void {
    // When the user navigates slides, clear all video state for that ri across all loop copies
    const len = this.items.length;
    this.playingVideosSet.update(s => {
      const newSet = new Set(s);
      for (const key of Array.from(newSet)) {
        const loopIdx = parseInt(key.split('-')[0], 10);
        if (!isNaN(loopIdx) && loopIdx % len === ri) newSet.delete(key);
      }
      return newSet;
    });
    this.videoReadySet.update(s => {
      const newSet = new Set(s);
      for (const key of Array.from(newSet)) {
        const loopIdx = parseInt(key.split('-')[0], 10);
        if (!isNaN(loopIdx) && loopIdx % len === ri) newSet.delete(key);
      }
      return newSet;
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
        const loopIdx = parseInt(card.getAttribute('data-loop-idx') || '-1', 10);
        if (loopIdx === -1) return;

        if (entry.isIntersecting) {
          card.setAttribute('data-intersecting', 'true');
        } else {
          card.setAttribute('data-intersecting', 'false');
          // Destroy any playing video when card scrolls out
          this.playingVideosSet.update(s => {
            const newSet = new Set(s);
            for (const key of Array.from(newSet)) {
              if (key.startsWith(`${loopIdx}-`)) newSet.delete(key);
            }
            return newSet;
          });
          this.videoReadySet.update(s => {
            const newSet = new Set(s);
            for (const key of Array.from(newSet)) {
              if (key.startsWith(`${loopIdx}-`)) newSet.delete(key);
            }
            return newSet;
          });
        }
      });
    }, {
      root: this.trackRef.nativeElement,
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
