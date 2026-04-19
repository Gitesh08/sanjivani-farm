import { Component } from '@angular/core';
import { NavbarComponent }    from '../home/components/navbar/navbar';
import { ActivitiesComponent } from '../home/components/activities/activities';
import { FooterComponent }    from '../home/components/footer/footer';

@Component({
  selector: 'app-activities-page',
  standalone: true,
  imports: [NavbarComponent, ActivitiesComponent, FooterComponent],
  template: `
    <app-navbar [forceScrolled]="true" />
    <main id="main-content" class="activities-page__main">
      <app-activities />
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content {
      outline: none;
      /* Push content down so it clears the fixed navbar */
      padding-top: clamp(5rem, 10vw, 7rem);
    }
  `],
})
export class ActivitiesPageComponent {}