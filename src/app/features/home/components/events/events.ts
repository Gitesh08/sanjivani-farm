import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  AfterViewInit,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

interface EventType {
  title: string;
  desc: string;
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

  readonly heroImage = 'assets/images/hero/hero-1.jpg'; 

  readonly eventTypes: EventType[] = [
    {
      title: 'Destination Weddings',
      desc: 'Exchange vows surrounded by 700 swaying coconut trees and shimmering private lakes.'
    },
    {
      title: 'Corporate Retreats',
      desc: 'Break away from the boardroom. Build teams, celebrate wins, and spark creativity in nature.'
    },
    {
      title: 'Private Parties',
      desc: 'Birthdays, anniversaries, or just a beautiful weekend blowout under the open sky.'
    }
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    // Animate Header & Content
    const contentWrap = host.querySelector('.events-split__content');
    if (contentWrap) {
      animateSectionTitle('.events-split__label, .events-split__title, .events-split__subtitle', contentWrap);
      animateScrollReveal('.events-list__item', contentWrap, 0.15);
      animateScrollReveal('.events-split__cta', contentWrap, 0.4);
    }
  }
}
