import { Injectable, signal, inject } from '@angular/core';
import { MediaService } from './media.service';

export interface TourVideoItem {
  hls: string;
  fallbackMp4: string;
  poster: string;
}

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private media = inject(MediaService);

  readonly isTourOpen = signal<boolean>(false);
  readonly currentVideoIndex = signal<number>(0);
  readonly tourVideoPlaying = signal<boolean>(false);

  readonly tourVideos: TourVideoItem[] = [
    {
      hls: this.media.masterPlaylist('drone-shot_02'),
      fallbackMp4: this.media.fallbackMp4('drone-shot_02'),
      poster: this.media.poster('drone-shot_02')
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
    this.tourVideoPlaying.set(true);
    this.isTourOpen.set(true);
  }

  closeTour(): void {
    this.isTourOpen.set(false);
    this.tourVideoPlaying.set(false);
  }

  nextVideo(): void {
    this.currentVideoIndex.update(i => (i + 1) % this.tourVideos.length);
    this.tourVideoPlaying.set(true);
  }

  prevVideo(): void {
    this.currentVideoIndex.update(i => (i === 0 ? this.tourVideos.length - 1 : i - 1));
    this.tourVideoPlaying.set(true);
  }
}
