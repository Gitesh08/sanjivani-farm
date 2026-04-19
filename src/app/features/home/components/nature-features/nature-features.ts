import {
  Component, AfterViewInit, ElementRef,
  ChangeDetectionStrategy, PLATFORM_ID, inject, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateSectionTitle } from '../../../../shared/utils/gsap-animations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NatureCard {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  gradient: string; /* CSS gradient fallback when image missing */
}

@Component({
  selector: 'app-nature-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nature-features.html',
  styleUrl: './nature-features.css',
})
export class NatureFeaturesComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

  readonly cards: NatureCard[] = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530402/image_ucfeks.png',
      title: '16 Acres of Pure Green',
      subtitle: '700+ coconut trees swaying around you',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776531113/download_20_ntzfol.jpg',
      title: 'Seasonal Farming Life',
      subtitle: 'From sowing to harvest, each season brings its own rhythm and rewards.',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504314/IMG20251209182411_lcutah.jpg',
      title: 'Wooden Bridge',
      subtitle: 'Iconic bridge + bamboo & Suru paths for peaceful strolls.',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776530857/download_10_q0jubw.jpg',
      title: 'Private Lakes',
      subtitle: 'Your own calm waters right on the property.',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776516090/image_9_zp1jmz.png',
      title: 'Lush Open Lawn',
      subtitle: 'Perfect for running, playing, or just lying under the sky.',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776504223/IMG_9378_1_tvoocw.jpg',
      title: 'Hammock Garden',
      subtitle: 'Beautiful spots for photos and quiet moments.',
      gradient: 'linear-gradient(160deg, #0d1b12 0%, #1a2e1e 100%)',
    },
  ];

  private mm = gsap.matchMedia();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Animate section header natively
    const sectionInner = this.el.nativeElement.querySelector('.nature__inner');
    if (sectionInner) {
      animateSectionTitle('.nature__label, .nature__title, .nature__tag', sectionInner);
    }

    const section = this.el.nativeElement.querySelector('.nature__scroll-container');
    const track = this.el.nativeElement.querySelector('.nature__track');

    if (section && track) {
      // Identical to nail-studio implementation: encapsulate inside matchMedia without setTimeout
      this.mm.add('all', () => {
        // Calculate how far to scroll
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });

        return () => { }; // Cleanup handled by GSAP
      });
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.mm.revert(); // Automatically kills all ScrollTriggers created in this matchMedia block
  }
}
