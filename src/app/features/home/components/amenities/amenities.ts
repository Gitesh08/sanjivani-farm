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
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>`,

  chef: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589c-.194 0-.376-.048-.544-.131A4 4 0 0 0 8.051 6.89c-.168.083-.35.131-.544.131a4 4 0 0 0-2.134 7.589c.411.197.727.584.727 1.041V20a1 1 0 0 0 1 1z"/>
    <path d="M6 17h12"/>
  </svg>`,

  firstaid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <path d="M12 10v4"/>
    <path d="M10 12h4"/>
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
      label: 'Care-Taker & Security',
      description: 'Dedicated care-taker, friendly staff, and full security.',
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
    {
      id: 'chef',
      label: 'In-House Chef',
      description: 'Fresh, delicious meals prepared by our expert chef.',
      safeIcon: this.safe('chef'),
    },
    {
      id: 'firstaid',
      label: 'First-Aid Services',
      description: 'Basic medical supplies and first-aid always available.',
      safeIcon: this.safe('firstaid'),
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
