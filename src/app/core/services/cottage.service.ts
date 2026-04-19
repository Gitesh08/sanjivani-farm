import { Injectable, signal } from '@angular/core';

export interface Cottage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  media: { type: 'img' | 'video', url: string, posterUrl?: string }[];
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
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776505637/wooden-glass-cottage_jgb0tc.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776505637/wooden-glass-cottage_jgb0tc.jpg'
        },
        // All room images — f_auto (WebP/AVIF auto), q_auto (AI quality), w_1200 (capped width)
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496183/IMG_9359_pcldak.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496183/IMG_9360_rkzptx.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496182/IMG_9362_t9jnl7.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496182/IMG_9361_cqhmk9.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496181/IMG_9364_guct2r.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496181/IMG_9363_bk7s6l.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496180/IMG_9365_zzqxeg.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496179/IMG_9366_vqobur.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496179/IMG_9367_mx2fut.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496178/IMG_9368_yowi7y.jpg' },
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
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776505634/red-stone-cottage_g0haqq.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776505634/red-stone-cottage_g0haqq.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496173/IMG-20260405-WA0016_xkkjiz.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496173/IMG-20260405-WA0017_caixto.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496172/IMG-20260405-WA0019_d2yfsa.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496172/IMG-20260405-WA0018_g71z1h.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496172/IMG-20260405-WA0020_ho0no9.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496171/IMG-20260405-WA0021_jyooym.jpg' }
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
          url: 'https://res.cloudinary.com/dsepjvm2l/video/upload/f_mp4,q_auto:best,w_1920/v1776505587/dormitory-cottage_n3xjnw.mp4',
          posterUrl: 'https://res.cloudinary.com/dsepjvm2l/video/upload/so_0,f_auto,q_auto:best,w_1920/v1776505587/dormitory-cottage_n3xjnw.jpg'
        },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496178/IMG_9395_1_iojzsx.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496177/IMG_9394_1_qhqt7c.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496176/IMG_9396_1_ij0qk4.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496176/IMG_9399_1_slozdu.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496176/IMG_9398_1_yaehnj.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496176/IMG_9397_1_gmwbse.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496175/IMG_9401_1_qyxw6c.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496175/IMG_9400_1_aqp035.jpg' },
        { type: 'img', url: 'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_1200/v1776496174/IMG_9402_1_dqb38s.jpg' }
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
