import { Injectable, signal, inject } from '@angular/core';
import { MediaService } from './media.service';

export interface Cottage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  media: { type: 'img' | 'video', url?: string, poster?: string, hls?: string, fallbackMp4?: string, alt?: string }[];
  size: string;
  baseCapacity: number;
  maxCapacity: number;
  pricePerPerson: number;
  beds: { label: string; pax: number }[];
  climate: string[];
  furniture: string[];
  bathrooms: string;
  views: string[];
  externalUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CottageService {
  private media = inject(MediaService);

  // Hardcoded standard pricing for now
  private readonly DEFAULT_PRICE = 2000;

  readonly cottages = signal<Cottage[]>([
    {
      id: 'wooden-glass',
      slug: 'wooden-glass-cottage',
      name: 'Wooden Glass Cottage',
      tagline: 'A cozy nature escape',
      description: 'Experience the warmth of our wooden glass cottage designed with expansive nature views right from your bed.',
      media: [
        // Video plays first — pristine quality HD, streaming natively
        {
          type: 'video',
          hls: this.media.masterPlaylist('wooden-glass-cottage'),
          fallbackMp4: this.media.fallbackMp4('wooden-glass-cottage'),
          poster: this.media.poster('wooden-glass-cottage'),
          alt: 'Wooden Glass Cottage cinematic tour at Sanjivani Farm'
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9363_cskpuj.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9359_hzljsx.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9362_m0nu4o.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9360_ys3val.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9365_lnwgkn.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9367_hlrmz5.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9368_flo8cw.webp', alt: 'Wooden Glass Cottage interior exterior view at Sanjivani Farm Resort Palghar Maharashtra' },
      ],
      size: '250 sq.ft',
      baseCapacity: 2,
      maxCapacity: 8,
      pricePerPerson: this.DEFAULT_PRICE,
      beds: [
        { label: '1 Double Bed', pax: 2 },
        { label: '1 Bunk Bed', pax: 2 },
        { label: '3 Extra Mattresses', pax: 4 }
      ],
      climate: ['1 AC', '1 Ceiling Fan', '1 Pedestal Fan', '2 Wall Fans'],
      furniture: ['1 Wardrobe', '1 Mini Side Table', '2 Wooden Chairs', '1 Table'],
      bathrooms: '1 Attached Bathroom',
      views: ['Nature View'],
      externalUrl: 'https://sanjivanifarmandresort.doorloom.com/p/woodenglasscottage01'
    },
    {
      id: 'red-stone',
      slug: 'red-stone-cottage',
      name: 'Red Stone Cottage',
      tagline: 'Rustic luxury defined',
      description: 'Built with beautiful red stone, this premium cottage offers rustic aesthetics with all modern comforts.',
      media: [
        {
          type: 'video',
          hls: this.media.masterPlaylist('red-stone-cottage'),
          fallbackMp4: this.media.fallbackMp4('red-stone-cottage'),
          poster: this.media.poster('red-stone-cottage'),
          alt: 'Red Stone Cottage cinematic tour at Sanjivani Farm'
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0021_ob9olz.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0019_qydsaz.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0017_zzvota.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0016_nsmmdg.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0018_viorhr.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG-20260405-WA0020_n65urf.webp', alt: 'Red Stone Cottage rustic luxury agritourism stay at Sanjivani Farm Near Mumbai' }
      ],
      size: '300 sq.ft',
      baseCapacity: 3,
      maxCapacity: 10,
      pricePerPerson: this.DEFAULT_PRICE,
      beds: [
        { label: '1 King Size Bed', pax: 3 },
        { label: '1 Bunk Bed (3 layer)', pax: 3 },
        { label: '3 Extra Mattresses', pax: 4 }
      ],
      climate: ['1 AC', '1 Ceiling Fan', '1 Pedestal Fan', '2 Wall Fans'],
      furniture: ['1 Wardrobe', '1 Mini Side Table', '2 Wooden Chairs', '1 Table'],
      bathrooms: '1 Attached Bathroom',
      views: ['Nature View'],
      externalUrl: 'https://sanjivanifarmandresort.doorloom.com/p/redstomecottage07'
    },
    {
      id: 'dormitory',
      slug: 'dormitory-cottage',
      name: 'Dormitory Cottage',
      tagline: 'Perfect for large groups',
      description: 'A spacious and well-equipped dormitory designed for large families, corporate outings, or friend groups.',
      media: [
        {
          type: 'video',
          hls: this.media.masterPlaylist('family-dormitory'), // User mentioned family-dormitory in previous fix
          fallbackMp4: this.media.fallbackMp4('family-dormitory'),
          poster: this.media.poster('family-dormitory'),
          alt: 'Dormitory Cottage video tour for large groups at Sanjivani Farm'
        },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9394_1_dorq1w.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9396_1_h0oi4w.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9397_1_cpcgdk.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9398_1_fgdonx.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9395_1_clsxew.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9399_1_lbib20.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9400_1_vvkmck.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' },
        { type: 'img', url: 'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_1200/IMG_9401_1_uy6vkw.webp', alt: 'Dormitory Cottage for large groups and corporate outings at Sanjivani Farm Saphale' }
      ],
      size: '600 sq.ft',
      baseCapacity: 8,
      maxCapacity: 16,
      pricePerPerson: this.DEFAULT_PRICE,
      beds: [
        { label: '2 Double Beds', pax: 4 },
        { label: '3 Triple Layer Bunk Beds', pax: 9 },
        { label: '3 Extra Mattresses', pax: 3 }
      ],
      climate: ['2 ACs', '2 Ceiling Fans', '2 Wall Fans'],
      furniture: [],
      bathrooms: '2 Attached Bathrooms',
      views: ['River View (Back Window)', 'Lake View (Front Window & Door)', 'Private Lawn Access'],
      externalUrl: 'https://sanjivanifarmandresort.doorloom.com/p/dormitorycottage10'
    }
  ]);

  getCottageBySlug(slug: string): Cottage | undefined {
    return this.cottages().find(c => c.slug === slug);
  }
}
