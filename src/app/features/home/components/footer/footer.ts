import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly phone = '+91 98765 43210';
  readonly phoneHref = 'tel:+919876543210';
  readonly whatsappHref = 'https://wa.me/919876543210';
  readonly email = 'hello@sanjivanifarmsco.in';
  readonly emailHref = 'mailto:hello@sanjivanifarmsco.in';
  readonly instagramHref = 'https://instagram.com/sanjivanifarms';

  readonly navItems = [
    { label: 'Our Story',  fragment: 'our-story' },
    { label: 'Cottages',   fragment: 'cottages' },
    { label: 'Activities', fragment: 'activities' },
    { label: 'Events',     fragment: 'events' },
    { label: 'Gallery',    fragment: 'gallery' },
    { label: 'Visit Us',   fragment: 'visit-us' },
  ];

  readonly legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ];

  scrollTo(fragment: string, event?: Event): void {
    if (event) event.preventDefault();
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
