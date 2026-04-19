import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  AfterViewInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSectionTitle } from '../../../../shared/utils/gsap-animations';

gsap.registerPlugin(ScrollTrigger);

export interface Amenity {
  id: string;
  label: string;
  description: string;
  safeIcon: SafeHtml;
  /** highlight = special WiFi card with dark teal bg */
  highlight?: boolean;
}

// ── Raw SVG strings ───────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  pool: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 12c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/>
    <path d="M2 17c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v3l2 2"/>
  </svg>`,

  // Disconnected / No-WiFi icon (diagonal strike through wifi arcs)
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"/>
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
    <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2.4"/>
  </svg>`,

  power: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>`,

  parking: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.6 5H8.4a2 2 0 0 0-1.9 1.3L5 10 3 8"/>
    <path d="M7 14h.01"/>
    <path d="M17 14h.01"/>
    <rect width="18" height="8" x="3" y="10" rx="2"/>
    <path d="M5 18v2"/>
    <path d="M19 18v2"/>
  </svg>`,

  staff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,

  kids: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="5" r="3"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <path d="M4 21h16"/>
  </svg>`,

  pet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7
      .08.703 1.725 1.722 3.656 1C7.417 10.528 8.116 9.55 8.5 8.5"/>
    <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7
      -.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>
    <path d="M8 14v.5"/>
    <path d="M16 14v.5"/>
    <path d="M11.25 16.25h1.5L12 17l-.75-.75z"/>
    <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21
      s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309"/>
  </svg>`,

  restaurant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>`,
};

@Component({
  selector: 'app-amenities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './amenities.html',
  styleUrl: './amenities.css',
  standalone: true,
})
export class AmenitiesComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);

  readonly amenities: Amenity[] = [
    {
      id: 'pool',
      label: 'Swimming Pool',
      description: 'Refresh in our stunning outdoor pool.',
      safeIcon: this.safe('pool'),
    },
    {
      id: 'wifi',
      label: 'Digital Detox',
      description: 'Wi-Fi restricted to common areas to help you disconnect.',
      safeIcon: this.safe('wifi'),
      highlight: true,
    },
    {
      id: 'power',
      label: 'Power Backup',
      description: 'Seamless electricity 24/7.',
      safeIcon: this.safe('power'),
    },
    {
      id: 'parking',
      label: 'Ample Parking',
      description: 'Spacious secure parking for all vehicles.',
      safeIcon: this.safe('parking'),
    },
    {
      id: 'staff',
      label: '24/7 Staff & CCTV',
      description: 'Friendly staff and full security coverage.',
      safeIcon: this.safe('staff'),
    },
    {
      id: 'kids',
      label: 'Kids Play Zone',
      description: 'Dedicated play area for little ones to run safely.',
      safeIcon: this.safe('kids'),
    },
    {
      id: 'pet',
      label: 'Pet-Friendly 🐕',
      description: 'Your furry friends are welcome here.',
      safeIcon: this.safe('pet'),
    },
    {
      id: 'restaurant',
      label: 'Restaurant',
      description: 'In-house kitchen and outdoor dining.',
      safeIcon: this.safe('restaurant'),
    },
  ];

  private safe(key: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ICONS[key]);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const host = this.el.nativeElement;

    // Header animation
    const inner = host.querySelector('.amenities__inner');
    if (inner) {
      animateSectionTitle(
        '.amenities__label, .amenities__title, .amenities__subtitle',
        inner,
      );
    }

    // Stagger amenity cards
    const cards = Array.from(host.querySelectorAll('.amenity-card')) as HTMLElement[];
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: host.querySelector('.amenities__grid'),
            start: 'top 82%',
            once: true,
          },
        },
      );
    }

    // Footer tagline
    const tagEl = host.querySelector('.amenities__tagline') as HTMLElement | null;
    if (tagEl) {
      gsap.fromTo(
        tagEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tagEl,
            start: 'top 90%',
            once: true,
          },
        },
      );
    }
  }
}
