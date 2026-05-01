import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  AfterViewInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

interface EventType {
  title: string;
  desc: string;
  images: string[];
}

@Component({
  selector: 'app-home-events',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true,
})
export class EventsComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly eventTypes: EventType[] = [
    {
      title: 'Destination Weddings',
      desc: 'Exchange vows surrounded by 700 swaying coconut trees and shimmering private lakes.',
      images: [
        'assets/images/nature/card-1.jpg',
        'assets/images/hero/hero-1.jpg',
        'assets/images/hero/hero-3.jpg'
      ]
    },
    {
      title: 'Corporate Retreats',
      desc: 'Break away from the boardroom. Build teams, celebrate wins, and spark creativity in nature.',
      images: [
        'assets/images/hero/hero-2.jpg',
        'assets/images/nature/card-2.jpg',
        'assets/images/activities/fishing.jpg'
      ]
    },
    {
      title: 'Private Parties',
      desc: 'Birthdays, anniversaries, or just a beautiful weekend blowout under the open sky.',
      images: [
        'assets/images/nature/card-2.jpg',
        'assets/images/activities/bonfire.jpg',
        'assets/images/hero/hero-4.png'
      ]
    }
  ];

  // Store the active slide index for each event card
  readonly activeSlides = signal<number[]>([0, 0, 0]);

  nextSlide(eventIndex: number, event: Event): void {
    event.stopPropagation();
    this.activeSlides.update(arr => {
      const newArr = [...arr];
      newArr[eventIndex] = (newArr[eventIndex] + 1) % this.eventTypes[eventIndex].images.length;
      return newArr;
    });
  }

  prevSlide(eventIndex: number, event: Event): void {
    event.stopPropagation();
    this.activeSlides.update(arr => {
      const newArr = [...arr];
      const length = this.eventTypes[eventIndex].images.length;
      newArr[eventIndex] = (newArr[eventIndex] - 1 + length) % length;
      return newArr;
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const host = this.el.nativeElement;

    // Animate Header
    const inner = host.querySelector('.events-preview__inner');
    if (inner) {
      animateSectionTitle('.events-preview__label, .events-preview__title, .events-preview__subtitle', inner);
    }

    // Stagger Event Cards
    animateScrollReveal('.event-card', host, 0.15);
  }
}
