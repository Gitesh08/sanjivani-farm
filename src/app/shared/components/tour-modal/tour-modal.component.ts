import { Component, inject, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../../core/services/tour.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-tour-modal',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  template: `
    <div *ngIf="tourService.isTourOpen()" class="tour-modal" role="dialog" aria-modal="true" aria-label="360 Aerial Tour">
      <!-- Top controls: Sound & Close -->
      <button class="tour-modal__sound" (click)="toggleMute($event)" [attr.aria-label]="isMuted ? 'Unmute Audio' : 'Mute Audio'">
        <svg *ngIf="isMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        <svg *ngIf="!isMuted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </button>

      <button class="tour-modal__close" (click)="closeTour()" aria-label="Close Tour">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Previous Video -->
      <button class="tour-modal__nav tour-modal__nav--prev" (click)="prevVideo($event)" aria-label="Previous Video">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <!-- Video Canvas -->
      <div class="tour-modal__video-container" (click)="togglePlay($event)">
        @let currentVid = tourService.tourVideos[tourService.currentVideoIndex()];

        <app-video-player
          #player
          customClass="tour-modal__video"
          [hlsUrl]="currentVid.hls || ''"
          [fallbackMp4]="currentVid.fallbackMp4 || ''"
          [poster]="currentVid.poster || ''"
          [autoplay]="true"
          [forceInit]="true"
          [loop]="true"
          [playsinline]="true"
          [muted]="isMuted"
          [controls]="false"
          [preferHighQuality]="true"
          (playing)="onVideoPlaying()"
          (pauseEvent)="onVideoPaused()">
        </app-video-player>

        <!-- Center Play Overlay Button -->
        <button *ngIf="!tourService.tourVideoPlaying()" class="tour-modal__play" (click)="playVideo($event)" aria-label="Play Tour Video">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        </button>
      </div>

      <!-- Next Video -->
      <button class="tour-modal__nav tour-modal__nav--next" (click)="nextVideo($event)" aria-label="Next Video">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- Mobile Orientation Prompt -->
      <div class="tour-modal__orientation-prompt">
        <div class="orientation-prompt__content">
          <svg class="rotate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
          <p>Please rotate your phone to landscape for the best experience.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tour-modal {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: rgba(4, 15, 22, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tour-modal__close,
    .tour-modal__sound {
      position: absolute;
      top: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      color: white;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 30;
      transition: all 0.2s ease;
    }

    .tour-modal__close {
      right: 1.5rem;
    }

    .tour-modal__sound {
      right: 5rem;
    }

    .tour-modal__close:hover,
    .tour-modal__sound:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }

    .tour-modal__close svg,
    .tour-modal__sound svg {
      width: 22px;
      height: 22px;
    }

    .tour-modal__nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      color: white;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 20;
      backdrop-filter: blur(10px);
      transition: all 0.25s ease;
    }

    .tour-modal__nav:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-50%) scale(1.08);
    }

    .tour-modal__nav svg {
      width: 28px;
      height: 28px;
    }

    .tour-modal__nav--prev {
      left: 1.5rem;
    }

    .tour-modal__nav--next {
      right: 1.5rem;
    }

    .tour-modal__video-container {
      width: 100%;
      max-width: 1100px;
      max-height: 82vh;
      aspect-ratio: 16 / 9;
      position: relative;
      display: flex;
      justify-content: center;
      margin-inline: 4.5rem;
      cursor: pointer;
    }

    ::ng-deep .tour-modal__video {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 16px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      background: black;
    }

    .tour-modal__play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(4, 15, 22, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 50%;
      color: white;
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .tour-modal__play:hover {
      background: #105B85;
      transform: translate(-50%, -50%) scale(1.1);
    }

    .tour-modal__play svg {
      width: 34px;
      height: 34px;
      margin-left: 4px;
    }

    .tour-modal__orientation-prompt {
      display: none;
    }

    @media (max-width: 768px) {
      .tour-modal__close {
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
      }

      .tour-modal__nav {
        width: 40px;
        height: 40px;
      }

      .tour-modal__nav svg {
        width: 22px;
        height: 22px;
      }

      .tour-modal__nav--prev {
        left: 0.75rem;
      }

      .tour-modal__nav--next {
        right: 0.75rem;
      }

      .tour-modal__play {
        width: 56px;
        height: 56px;
      }

      .tour-modal__play svg {
        width: 26px;
        height: 26px;
      }

      .tour-modal__video-container {
        margin: 1rem 3rem;
        max-height: 70vh;
      }

      @media (orientation: portrait) {
        .tour-modal__video-container {
          aspect-ratio: 16 / 9;
          width: 100%;
          height: auto;
          margin: auto 0;
        }

        ::ng-deep .tour-modal__video {
          filter: blur(8px) brightness(0.5);
          animation: unblurVideo 3.5s forwards ease-in-out;
        }

        .tour-modal__orientation-prompt {
          display: flex;
          position: absolute;
          inset: 0;
          z-index: 25;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          pointer-events: none;
          animation: fadeOutPrompt 3.5s forwards ease-in-out;
        }

        .orientation-prompt__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: white;
          max-width: 280px;
        }

        .rotate-icon {
          width: 48px;
          height: 48px;
          animation: rotatePhone 2s ease-in-out infinite;
        }

        .orientation-prompt__content p {
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.4;
          margin: 0;
          color: #ffffff !important;
        }
      }
    }

    @keyframes rotatePhone {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(-90deg); }
      100% { transform: rotate(0deg); }
    }

    @keyframes unblurVideo {
      0%, 75% { filter: blur(8px) brightness(0.5); }
      100% { filter: blur(0px) brightness(1); }
    }

    @keyframes fadeOutPrompt {
      0%, 75% { opacity: 1; visibility: visible; }
      100% { opacity: 0; visibility: hidden; }
    }
  `]
})
export class TourModalComponent {
  public tourService = inject(TourService);

  @ViewChild('player') player?: VideoPlayerComponent;
  isMuted = true;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.tourService.isTourOpen()) {
      this.closeTour();
    }
  }

  closeTour(): void {
    this.player?.pause();
    this.tourService.closeTour();
  }

  nextVideo(event?: Event): void {
    if (event) event.stopPropagation();
    this.tourService.nextVideo();
    setTimeout(() => {
      this.player?.play();
    }, 50);
  }

  prevVideo(event?: Event): void {
    if (event) event.stopPropagation();
    this.tourService.prevVideo();
    setTimeout(() => {
      this.player?.play();
    }, 50);
  }

  togglePlay(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.tourService.tourVideoPlaying()) {
      this.player?.pause();
      this.tourService.tourVideoPlaying.set(false);
    } else {
      this.player?.play();
      this.tourService.tourVideoPlaying.set(true);
    }
  }

  playVideo(event: Event): void {
    event.stopPropagation();
    this.player?.play();
    this.tourService.tourVideoPlaying.set(true);
  }

  onVideoPlaying(): void {
    this.tourService.tourVideoPlaying.set(true);
  }

  onVideoPaused(): void {
    this.tourService.tourVideoPlaying.set(false);
  }

  toggleMute(event: Event): void {
    event.stopPropagation();
    this.isMuted = !this.isMuted;
    this.player?.setMuted(this.isMuted);
  }
}
