import { Component, ElementRef, PLATFORM_ID, AfterViewInit, ViewChild, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { animateScrollReveal } from '../../../../shared/utils/gsap-animations';
import { CottageService } from '../../../../core/services/cottage.service';
import { VideoPlayerComponent } from '../../../../shared/components/video-player/video-player.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashStateService } from '../../../../core/services/splash-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent],
  templateUrl: './cottages.html',
  styleUrls: ['./cottages.css']
})
export class CottagesComponent implements AfterViewInit {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  private cottageService = inject(CottageService);
  private platformId = inject(PLATFORM_ID);
  private splashState = inject(SplashStateService);
  private splashSub?: Subscription;

  cottages = this.cottageService.cottages;

  /** Active slide index per card */
  readonly activeSlides = signal<number[]>([]);

  /** Mute state per card — all start muted */
  readonly mutedState = signal<boolean[]>([]);

  /** Netflix-grade buffer state: true when video is fully loaded */
  readonly videoReady = signal<boolean[]>([]);

  /** Playing state per card — true when user has clicked play */
  readonly playingState = signal<boolean[]>([]);

  constructor() {
    const len = this.cottages().length;
    this.activeSlides.set(new Array(len).fill(0));
    this.mutedState.set(new Array(len).fill(true));
    this.videoReady.set(new Array(len).fill(false));
    this.playingState.set(new Array(len).fill(false));
  }

  /** Fired by (playing) event — marks video as ready and playing */
  onVideoCanPlay(cottageIndex: number): void {
    this.videoReady.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = true;
      return newArr;
    });
    this.playingState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = true;
      return newArr;
    });
  }

  /** User clicked play — find the video element and call play() directly */
  playVideo(cottageIndex: number, mediaIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.playingState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = true;
      return newArr;
    });
    const card = this.sectionRef.nativeElement.querySelectorAll('.cottage-card')[cottageIndex] as HTMLElement;
    const videoEl = card?.querySelector(`[data-mi="${mediaIndex}"] video`) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.muted = this.mutedState()[cottageIndex];
      videoEl.play().catch(e => {
        console.warn('[Cottage] play failed:', e);
        this.playingState.update(arr => {
          const newArr = [...arr];
          newArr[cottageIndex] = false;
          return newArr;
        });
      });
    }
  }

  /** User clicked pause / whole-card click while playing */
  pauseVideo(cottageIndex: number, mediaIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.playingState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = false;
      return newArr;
    });
    const card = this.sectionRef.nativeElement.querySelectorAll('.cottage-card')[cottageIndex] as HTMLElement;
    const videoEl = card?.querySelector(`[data-mi="${mediaIndex}"] video`) as HTMLVideoElement | null;
    if (videoEl) videoEl.pause();
  }

  /** Fired by (pauseEvent) from video-player */
  onVideoPause(cottageIndex: number): void {
    this.playingState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = false;
      return newArr;
    });
  }

  nextSlide(cottageIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeSlides.update(arr => {
      const newArr = [...arr];
      const length = this.cottages()[cottageIndex].media.length;
      newArr[cottageIndex] = (newArr[cottageIndex] + 1) % length;
      return newArr;
    });
    // Reset play state when navigating to new slide
    this.playingState.update(arr => { const n = [...arr]; n[cottageIndex] = false; return n; });
    this.videoReady.update(arr => { const n = [...arr]; n[cottageIndex] = false; return n; });
  }

  prevSlide(cottageIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.activeSlides.update(arr => {
      const newArr = [...arr];
      const length = this.cottages()[cottageIndex].media.length;
      newArr[cottageIndex] = (newArr[cottageIndex] - 1 + length) % length;
      return newArr;
    });
    // Reset play state when navigating to new slide
    this.playingState.update(arr => { const n = [...arr]; n[cottageIndex] = false; return n; });
    this.videoReady.update(arr => { const n = [...arr]; n[cottageIndex] = false; return n; });
  }

  /** Toggle mute */
  toggleMute(cottageIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.mutedState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = !newArr[cottageIndex];
      return newArr;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger);

    this.splashSub = this.splashState.splashComplete$.subscribe(isComplete => {
      if (isComplete) {
        setTimeout(() => {
          animateScrollReveal(
            this.sectionRef.nativeElement.querySelectorAll('.scroll-reveal'),
            this.sectionRef.nativeElement
          );

          const cards = this.sectionRef.nativeElement.querySelectorAll('.cottage-card');
          cards.forEach((card: any) => {
            gsap.fromTo(card,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  end: 'top 20%',
                  toggleActions: 'play none none reverse',
                }
              }
            );
          });

          ScrollTrigger.refresh();
        }, 300);
      }
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.splashSub?.unsubscribe();
  }
}
