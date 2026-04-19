import { Component, ElementRef, PLATFORM_ID, AfterViewInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animateScrollReveal } from '../../../../shared/utils/gsap-animations';
import { CottageService } from '../../../../core/services/cottage.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cottages.html',
  styleUrls: ['./cottages.css']
})
export class CottagesComponent implements AfterViewInit {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  private cottageService = inject(CottageService);
  private platformId = inject(PLATFORM_ID);

  cottages = this.cottageService.cottages;

  /** Active slide index per card */
  readonly activeSlides = signal<number[]>([]);

  /** Mute state per card — all start muted */
  readonly mutedState = signal<boolean[]>([]);

  /** Netflix-grade buffer state: true when video is fully loaded and can loop smoothly */
  readonly videoReady = signal<boolean[]>([]);

  constructor() {
    const len = this.cottages().length;
    this.activeSlides.set(new Array(len).fill(0));
    this.mutedState.set(new Array(len).fill(true));
    this.videoReady.set(new Array(len).fill(false));
  }

  /** Fired organically by the native HTMLVideoElement when it is fully buffered and ready to play */
  onVideoCanPlay(cottageIndex: number): void {
    this.videoReady.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = true;
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
  }

  /** Toggle mute on the actual video DOM element for this card */
  toggleMute(cottageIndex: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    // Flip signal state
    this.mutedState.update(arr => {
      const newArr = [...arr];
      newArr[cottageIndex] = !newArr[cottageIndex];
      return newArr;
    });
    // Directly mute/unmute the DOM video so it takes effect immediately
    const cards = this.sectionRef.nativeElement.querySelectorAll('.cottage-card');
    const card = cards[cottageIndex] as HTMLElement | undefined;
    const video = card?.querySelector('video') as HTMLVideoElement | null;
    if (video) video.muted = this.mutedState()[cottageIndex];
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger);

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
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              onEnter: () => {
                const vid = card.querySelector('video') as HTMLVideoElement;
                if (vid) { vid.muted = true; vid.play().catch(() => { }); }
              },
              onLeave: () => {
                const vid = card.querySelector('video') as HTMLVideoElement;
                if (vid) vid.pause();
              },
              onEnterBack: () => {
                const vid = card.querySelector('video') as HTMLVideoElement;
                if (vid) { vid.muted = true; vid.play().catch(() => { }); }
              },
              onLeaveBack: () => {
                const vid = card.querySelector('video') as HTMLVideoElement;
                if (vid) vid.pause();
              }
            }
          }
        );
      });

      ScrollTrigger.refresh();
    }, 100);
  }
}
