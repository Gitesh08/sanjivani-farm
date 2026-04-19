import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-page',
  imports: [RouterLink],
  template: `<div style="min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem"><h1 style="font-family:var(--font-heading);color:var(--color-primary);margin-bottom:1rem">Events</h1><p style="color:var(--color-on-surface-variant)">Coming soon.</p><a routerLink="/" style="margin-top:2rem;color:var(--color-secondary);font-weight:600">← Back to Home</a></div>`,
})
export class EventsPageComponent {}