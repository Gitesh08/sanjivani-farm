import { Component, OnInit, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../home/components/navbar/navbar';
import { FooterComponent } from '../home/components/footer/footer';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player.component';
import { MediaService } from '../../core/services/media.service';
import { SeoService } from '../../core/services/seo.service';

export interface ActivityMediaItem {
  type: 'img' | 'video';
  url?: string;
  poster?: string;
  hls?: string;
  fallbackMp4?: string;
}

export interface ActivityDetail {
  id: string;
  category: 'water' | 'family' | 'active' | 'relaxation';
  title: string;
  tagline: string;
  badge: string;
  pills: string[];
  media: ActivityMediaItem[];
}

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, BreadcrumbComponent, VideoPlayerComponent],
  templateUrl: './activities-page.html',
  styleUrl: './activities-page.css'
})
export class ActivitiesPageComponent implements OnInit {
  private media = inject(MediaService);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  readonly categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'water', label: 'Lakes & Water' },
    { id: 'family', label: 'Family & Kids' },
    { id: 'active', label: 'Active & Sports' },
    { id: 'relaxation', label: 'Relaxation & Dining' },
  ];

  readonly selectedCategory = signal<string>('all');

  // Tracks active slide index per activity ID
  readonly activeMediaIndices = signal<Record<string, number>>({});

  // Tracks playing videos (format: 'activityId-mediaIndex')
  readonly playingVideos = signal<Set<string>>(new Set());

  // Tracks muted state per activity ID
  readonly mutedState = signal<Record<string, boolean>>({});

  readonly activities: ActivityDetail[] = [
    {
      id: 'toy-train',
      category: 'family',
      title: 'The Sanjivani Toy Train',
      tagline: 'A nostalgic rail journey through 300+ coconut palms.',
      badge: 'Guest Favorite',
      pills: ['Morning & Sunset Runs', 'For All Ages', 'Complimentary'],
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
      ]
    },
    {
      id: 'kayaking',
      category: 'water',
      title: 'Kayaking & Private Boating',
      tagline: 'Glide over tranquil private lake waters surrounded by nature.',
      badge: 'Signature Lake',
      pills: ['Life Jackets Provided', 'Calm Waters', 'Supervised'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('boating_07'),
          hls: this.media.masterPlaylist('boating_07'),
          fallbackMp4: this.media.fallbackMp4('boating_07')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250528_164616219_ffglse.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20250503_114017966_ufcr3p.webp' },
        {
          type: 'video',
          poster: this.media.poster('boating_06'),
          hls: this.media.masterPlaylist('boating_06'),
          fallbackMp4: this.media.fallbackMp4('boating_06')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20251205164424_dg7pra.webp' },
        {
          type: 'video',
          poster: this.media.poster('boating_03'),
          hls: this.media.masterPlaylist('boating_03'),
          fallbackMp4: this.media.fallbackMp4('boating_03')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20250816180940_01_o2tm7n.webp' }
      ]
    },
    {
      id: 'swimming-pool',
      category: 'relaxation',
      title: 'Outdoor Swimming Pool',
      tagline: 'Cool off in crystal-clear water framed by tropical palms.',
      badge: 'All-Day Refresh',
      pills: ['7 AM – 7 PM', 'Sun Loungers', 'Palm Views'],
      media: [
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6738_sdjzbg.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6744_awxmdu.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_6737_zjvaxe.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_20240628_145322839_aum997.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260703140302_owunwq.webp' }
      ]
    },
    {
      id: 'wooden-bridge',
      category: 'water',
      title: 'Wooden Bridge & Lake Boardwalk',
      tagline: 'Hand-crafted timber boardwalk over mirror-like waters.',
      badge: 'Iconic Landmark',
      pills: ['Sunset Spot', 'Scenic Landmark', 'Reflections'],
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
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20251209182411_w0an0l.webp' }
      ]
    },
    {
      id: 'hammock-gardens',
      category: 'relaxation',
      title: 'Hammock Gardens in the Palm Grove',
      tagline: 'Unwind and sway gently in shaded coconut groves.',
      badge: 'Deep Rest',
      pills: ['Shaded Palms', 'Digital Detox', 'Open All Day'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('hammock-garden'),
          hls: this.media.masterPlaylist('hammock-garden'),
          fallbackMp4: this.media.fallbackMp4('hammock-garden')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9379_1_qrdefg.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9376_1_eayc1u.webp' }
      ]
    },
    {
      id: 'cycling',
      category: 'active',
      title: 'Farm Cycling & Trails',
      tagline: 'Pedal 16 acres of peaceful country nature trails.',
      badge: 'Self-Paced',
      pills: ['Bicycles Provided', 'Car-Free Trails', 'Complimentary'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('cycling'),
          hls: this.media.masterPlaylist('cycling'),
          fallbackMp4: this.media.fallbackMp4('cycling')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9414_1_hw1kky.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9421_1_ln2qj9.webp' }
      ]
    },
    {
      id: 'games-sports',
      category: 'active',
      title: 'Lawn Sports & Veranda Games',
      tagline: 'Cricket, football, archery & classic board games.',
      badge: 'Social & Fun',
      pills: ['Turf Cricket & Football', 'Archery & Shooting', 'Carrom & Badminton'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('gaming'),
          hls: this.media.masterPlaylist('gaming'),
          fallbackMp4: this.media.fallbackMp4('gaming')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9408_1_akjrz4.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9407_1_mjk4l4.webp' }
      ]
    },
    {
      id: 'lawn-area',
      category: 'family',
      title: 'Expansive Green Lawns',
      tagline: 'Barefoot grass walks, family games, and starry nights.',
      badge: 'Open Greenery',
      pills: ['16-Acre Turf', 'Fenced & Safe', 'Yoga & Stargazing'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('lawn-area'),
          hls: this.media.masterPlaylist('lawn-area'),
          fallbackMp4: this.media.fallbackMp4('lawn-area')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG20260215125824_fycjy9.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9385_1_trwhsy.webp' }
      ]
    },
    {
      id: 'farm-dining',
      category: 'relaxation',
      title: 'Authentic Konkan Farm Dining',
      tagline: 'Freshly cooked Maharashtrian meals and organic thalis.',
      badge: 'Farm-to-Table',
      pills: ['Fresh Local Produce', 'Traditional Recipes', 'Outdoor Pavilion'],
      media: [
        {
          type: 'video',
          poster: this.media.poster('dinning'),
          hls: this.media.masterPlaylist('dinning'),
          fallbackMp4: this.media.fallbackMp4('dinning')
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9409_1_kms5tq.webp' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9411_1_pjudpx.webp' }
      ]
    }
  ];

  readonly filteredActivities = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.activities;
    return this.activities.filter(a => a.category === cat);
  });

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Activities & Nature Experiences | Sanjivani Farm & Resort Palghar',
      description: 'Discover the Sanjivani Toy Train, private lake kayaking, swimming pool, cycling, and lawn games across 16 acres in Palghar near Mumbai.',
      keywords: 'resort with toy train, farm stay activities Palghar, kayaking resort Mumbai, weekend activities Palghar, resort with swimming pool Saphale',
      url: '/activities'
    });

    this.seoService.injectBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Activities', url: '/activities' }
    ]);
  }

  setCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  getActiveIndex(activityId: string): number {
    return this.activeMediaIndices()[activityId] || 0;
  }

  prevMedia(activity: ActivityDetail, event: Event): void {
    event.stopPropagation();
    const current = this.getActiveIndex(activity.id);
    const count = activity.media.length;
    const nextIdx = (current - 1 + count) % count;
    this.updateMediaIndex(activity.id, nextIdx);
  }

  nextMedia(activity: ActivityDetail, event: Event): void {
    event.stopPropagation();
    const current = this.getActiveIndex(activity.id);
    const count = activity.media.length;
    const nextIdx = (current + 1) % count;
    this.updateMediaIndex(activity.id, nextIdx);
  }

  private updateMediaIndex(activityId: string, idx: number): void {
    this.activeMediaIndices.update(state => ({
      ...state,
      [activityId]: idx
    }));
  }

  playVideo(activityId: string, mediaIdx: number, event: Event): void {
    event.stopPropagation();
    const key = `${activityId}-${mediaIdx}`;
    this.playingVideos.update(set => {
      const next = new Set(set);
      next.add(key);
      return next;
    });
  }

  pauseVideo(activityId: string, mediaIdx: number, event: Event): void {
    event.stopPropagation();
    const key = `${activityId}-${mediaIdx}`;
    this.playingVideos.update(set => {
      const next = new Set(set);
      next.delete(key);
      return next;
    });
  }

  isVideoPlaying(activityId: string, mediaIdx: number): boolean {
    return this.playingVideos().has(`${activityId}-${mediaIdx}`);
  }

  toggleMute(activityId: string, event: Event): void {
    event.stopPropagation();
    this.mutedState.update(state => ({
      ...state,
      [activityId]: !state[activityId]
    }));
  }

  isMuted(activityId: string): boolean {
    return this.mutedState()[activityId] ?? true;
  }
}
