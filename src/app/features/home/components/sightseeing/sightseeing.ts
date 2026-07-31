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
      distance: '5 km away',
      desc: 'Beautiful, long beach lined with Suru trees.',
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1785528295/Kelve_Beach_zicfcw.jpg'
    },
    {
      name: 'Kelva Fort',
      distance: '5.8 km away',
      desc: 'Historic coastal fort standing tall by the sea.',
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1785529417/Kelva-Sea-Fort_uobzqu.jpg'
    },
    {
      name: 'Karwale Dam',
      distance: '12 km away',
      desc: 'Peaceful earthfill dam surrounded by lush greenery.',
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1785529418/karwale-dam_zrbjs4.jpg'
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
