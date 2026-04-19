import { Component, ChangeDetectionStrategy, ElementRef, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

interface Spot {
  name: string;
  distance: string;
  desc: string;
  image: string;
}

@Component({
  selector: 'app-sightseeing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sightseeing.html',
  styleUrl: './sightseeing.css',
  standalone: true
})
export class SightseeingComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly spots: Spot[] = [
    {
      name: 'Kelva Beach',
      distance: '15 km away',
      desc: 'Beautiful, long beach lined with Suru trees.',
      image: 'assets/images/nature/card-1.jpg' // Using placeholder from nature as fallback
    },
    {
      name: 'Asherigad Fort',
      distance: '25 km away',
      desc: 'Magnificent hill fort perfect for a morning trek.',
      image: 'assets/images/nature/card-2.jpg'
    },
    {
      name: 'Shirgaon Fort',
      distance: '18 km away',
      desc: 'Historic Portuguese fort offering stunning sunset views.',
      image: 'assets/images/nature/card-3.jpg'
    }
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sectionInner = this.el.nativeElement.querySelector('.sightseeing__inner');
    if (sectionInner) {
      animateSectionTitle('.sightseeing__label, .sightseeing__title, .sightseeing__tag', sectionInner);
      animateScrollReveal('.spot-card', sectionInner, 0.15);
    }
  }
}
