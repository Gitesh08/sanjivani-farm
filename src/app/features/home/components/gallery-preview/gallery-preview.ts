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

  // Curated showcase of top high-res resort highlights for the preview slider
  readonly images = [
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786185697/16-acre-farm_y2ikvq.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786100151/farming-sunflower_kfdj4l.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786185697/private-lakes_xunogz.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786100206/IMG20260215125824_fycjy9.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786100189/IMG_9379_1_qrdefg.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9363_cskpuj.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9359_hzljsx.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9362_m0nu4o.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG-20260405-WA0021_ob9olz.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG-20260405-WA0019_qydsaz.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG-20260405-WA0017_zzvota.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9394_1_dorq1w.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9396_1_h0oi4w.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9397_1_cpcgdk.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9398_1_fgdonx.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_9395_1_clsxew.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/v1786100271/IMG20250817093229_wpclwy.webp',
    'https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto,w_800/IMG_6738_sdjzbg.webp'
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
