import {
  Component, OnInit, OnDestroy, signal, computed,
  ChangeDetectionStrategy, PLATFORM_ID, inject, ElementRef, AfterViewInit, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';

interface HeroSlide {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  host: { ngSkipHydration: 'true' },
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);

  readonly slides: HeroSlide[] = [
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1920/v1776500316/IMG20260215125824_acfgbw.jpg', alt: 'Sanjivani Farm beautiful landscape' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1920/v1776500372/IMG_9391_1_zemfrs.jpg', alt: 'Beautiful nature at Sanjivani Farm' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1920/v1776500178/IMG20251205164424_m2btrh.jpg', alt: 'Kayaking on the private lake — Sanjivani Farms' },
    { src: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1920/v1776583128/image_3_f6xde4.png', alt: 'Aerial view of Sanjivani Farm' },
  ];

  readonly currentIndex = signal(0);
  readonly isTransitioning = signal(false);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startSlideshow();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.animateEntrance();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private startSlideshow(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => this.nextSlide(), 5000);
    });
  }

  nextSlide(): void {
    if (this.isTransitioning()) return;
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.currentIndex.update(i => (i + 1) % this.slides.length);
      this.isTransitioning.set(false);
    }, 800);
  }

  goToSlide(index: number): void {
    if (index === this.currentIndex()) return;
    this.currentIndex.set(index);
    if (this.intervalId) clearInterval(this.intervalId);
    this.startSlideshow();
  }

  private animateEntrance(): void {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo('.hero__badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero__title',
      { opacity: 0, y: 60, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero__subtitle',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo('.hero__actions',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.hero__scroll-hint',
      { opacity: 0 },
      { opacity: 1, duration: 0.7 },
      '-=0.3'
    );
  }

  scrollTo(fragment: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
