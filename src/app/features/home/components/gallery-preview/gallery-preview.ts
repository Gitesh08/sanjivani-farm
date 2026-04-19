import { Component, ChangeDetectionStrategy, ElementRef, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animateSectionTitle, animateScrollReveal } from '../../../../shared/utils/gsap-animations';

@Component({
  selector: 'app-gallery-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery-preview.html',
  styleUrl: './gallery-preview.css',
  standalone: true,
  imports: [RouterLink]
})
export class GalleryPreviewComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  readonly images = [
    // Hero
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500372/IMG_9391_1_zemfrs.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500178/IMG20251205164424_m2btrh.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776583128/image_3_f6xde4.png',
    // Our Story
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776530402/image_ucfeks.png',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776530497/download_14_j3juv1.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500316/IMG20260215125824_acfgbw.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500180/IMG20260110175042_a5umau.jpg',
    // Nature Features
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776531113/download_20_ntzfol.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776504314/IMG20251209182411_lcutah.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776530857/download_10_q0jubw.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776516090/image_9_zp1jmz.png',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776504223/IMG_9378_1_tvoocw.jpg',
    // Dining
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776530541/download_11_yfhud9.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776530546/download_18_s3vafq.jpg',
    // Activities
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500378/IMG_9393_1_iiqpe9.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500375/IMG_9392_1_tnsm7d.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500369/IMG_9390_1_ont8ak.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776516128/image_7_une50d.png',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776504220/IMG_9376_1_ejrxgx.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776504220/IMG_9373_1_asksaf.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776516148/image_ytjusr.png',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776499918/IMG_9415_1_hvsfse.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776499922/IMG_9420_1_mzs6nf.jpg',
    'https://res.cloudinary.com/dsepjvm2l/image/upload/f_auto,q_auto,w_800/v1776500353/IMG_9408_1_bbacib.jpg',
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const sectionInner = this.el.nativeElement.querySelector('.gallery-preview__inner');
    if (sectionInner) {
      animateSectionTitle('.gallery-preview__label, .gallery-preview__title, .gallery-preview__tag', sectionInner);
      animateScrollReveal('.gallery-preview__action', sectionInner, 0.2);
    }
  }
}
