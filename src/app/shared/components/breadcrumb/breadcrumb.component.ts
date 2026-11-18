import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="app-breadcrumb" [class.app-breadcrumb--dark]="variant() === 'dark'" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        @for (item of items(); track item.label; let last = $last) {
          <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
            @if (!last && item.url) {
              <a [routerLink]="item.url" class="breadcrumb-link">{{ item.label }}</a>
            } @else {
              <span class="breadcrumb-text">{{ item.label }}</span>
            }
          </li>
          @if (!last) {
            <li class="breadcrumb-separator" aria-hidden="true">/</li>
          }
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .app-breadcrumb {
      display: flex;
      align-items: center;
      margin-bottom: var(--space-5, 1.25rem);
      width: 100%;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 10px;
      list-style: none;
      padding: 0;
      margin: 0;
      font-family: var(--font-body, system-ui, sans-serif);
      font-size: 0.85rem;
      font-weight: 500;
    }

    .breadcrumb-link {
      color: #087592;
      text-decoration: none;
      transition: color 0.2s ease;
      font-weight: 600;
    }

    .breadcrumb-link:hover {
      color: #0A2940;
      text-decoration: underline;
    }

    .breadcrumb-separator {
      color: rgba(10, 41, 64, 0.3);
      user-select: none;
      font-size: 0.8rem;
    }

    .breadcrumb-item.active .breadcrumb-text {
      color: #0A2940;
      font-weight: 600;
    }

    /* ── Dark Variant ── */
    .app-breadcrumb--dark .breadcrumb-link {
      color: rgba(248, 249, 245, 0.75);
    }

    .app-breadcrumb--dark .breadcrumb-link:hover {
      color: #ffffff;
    }

    .app-breadcrumb--dark .breadcrumb-separator {
      color: rgba(248, 249, 245, 0.35);
    }

    .app-breadcrumb--dark .breadcrumb-item.active .breadcrumb-text {
      color: #ffffff;
      font-weight: 600;
    }
  `]
})
export class BreadcrumbComponent {
  readonly items = input.required<BreadcrumbItem[]>();
  readonly variant = input<'light' | 'dark'>('light');
}
