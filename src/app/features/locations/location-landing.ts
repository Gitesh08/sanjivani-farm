import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { LOCATIONS, LocationData } from '../../core/data/locations.data';

import { NavbarComponent } from '../home/components/navbar/navbar';
import { FooterComponent } from '../home/components/footer/footer';
import { NatureFeaturesComponent } from '../home/components/nature-features/nature-features';
import { ActivitiesComponent } from '../home/components/activities/activities';
import { CottagesComponent } from '../home/components/cottages/cottages';

@Component({
  selector: 'app-location-landing',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    NatureFeaturesComponent,
    ActivitiesComponent,
    CottagesComponent
  ],
  template: `
    <app-navbar [forceScrolled]="true" />
    
    <main id="main-content" *ngIf="location">
      <!-- Dynamic Location Hero -->
      <section class="location-hero">
        <div class="location-hero__bg">
          <img src="https://res.cloudinary.com/lrjfhrda/image/upload/f_auto,q_auto:best,w_1920/v1786185697/16-acre-farm_y2ikvq.webp" alt="Sanjivani Farm Aerial" fetchpriority="high">
          <div class="location-hero__overlay"></div>
        </div>
        
        <div class="location-hero__content">
          <span class="location-hero__tag">Only {{ location.driveTime }} from {{ location.name }}</span>
          <h1 class="location-hero__title">{{ location.heroHeadline }}</h1>
          <p class="location-hero__subtitle">{{ location.heroSubheadline }}</p>
          
          <div class="location-hero__attractions">
            <h3>Explore nearby:</h3>
            <ul>
              <li *ngFor="let attr of location.attractions">{{ attr }}</li>
            </ul>
          </div>
          
          <a href="https://wa.me/918108446040" target="_blank" rel="noopener" class="location-hero__cta">
            Book Your Stay
          </a>
        </div>
      </section>

      <!-- Reused Premium Components -->
      <app-nature-features />
      <app-cottages />
      <app-activities />
      
    </main>
    <app-footer />
  `,
  styles: [`
    :host { display: block; }
    #main-content { outline: none; }
    
    .location-hero {
      position: relative;
      min-height: 80vh;
      display: flex;
      align-items: center;
      padding: clamp(6rem, 12vw, 10rem) var(--container-padding) 4rem;
      overflow: hidden;
    }
    
    .location-hero__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    
    .location-hero__bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .location-hero__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(13, 27, 18, 0.7) 0%, rgba(13, 27, 18, 0.9) 100%);
    }
    
    .location-hero__content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      color: var(--color-text-primary);
    }
    
    .location-hero__tag {
      display: inline-block;
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-primary);
      margin-bottom: 1.5rem;
      padding: 0.5rem 1rem;
      border: 1px solid rgba(132, 169, 140, 0.3);
      border-radius: 100px;
      background: rgba(13, 27, 18, 0.5);
      backdrop-filter: blur(4px);
    }
    
    .location-hero__title {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 5vw, 4.5rem);
      font-weight: 400;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    
    .location-hero__subtitle {
      font-family: var(--font-sans);
      font-size: clamp(1.125rem, 2vw, 1.25rem);
      color: var(--color-text-secondary);
      line-height: 1.6;
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-inline: auto;
    }
    
    .location-hero__attractions {
      margin-bottom: 3rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      display: inline-block;
      text-align: left;
    }
    
    .location-hero__attractions h3 {
      font-family: var(--font-sans);
      font-size: 1rem;
      color: var(--color-primary);
      margin-bottom: 1rem;
      font-weight: 500;
    }
    
    .location-hero__attractions ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    
    .location-hero__attractions li {
      font-family: var(--font-sans);
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .location-hero__attractions li::before {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--color-primary);
    }
    
    .location-hero__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2.5rem;
      background-color: var(--color-primary);
      color: var(--color-bg-base);
      font-family: var(--font-sans);
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      border-radius: 100px;
      transition: all 0.3s ease;
    }
    
    .location-hero__cta:hover {
      background-color: var(--color-primary-light);
      transform: translateY(-2px);
    }
  `]
})
export class LocationLandingComponent implements OnInit {
  location: LocationData | undefined;
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const locParam = params.get('location');
      const intentParam = params.get('intent-near');
      
      if (locParam && LOCATIONS[locParam]) {
        // Deep copy so we don't mutate the global locations data
        this.location = { ...LOCATIONS[locParam] };
        
        // Dynamically build intent string (e.g. "resort-near" -> "Resort near")
        const intentString = intentParam ? intentParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Stay near';
        const dynamicTitle = `${intentString} ${this.location.name} - Sanjivani Farm & Resort`;
        
        // --- EXPERIENCE ENGINE OVERRIDES ---
        const intentLower = intentParam ? intentParam.toLowerCase() : '';
        
        if (intentLower.includes('kayaking')) {
          this.location.heroHeadline = `The Ultimate Kayaking Resort Near ${this.location.name}`;
          this.location.heroSubheadline = `Experience the thrill of private kayaking on our serene lakes, just ${this.location.driveTime} from ${this.location.name}.`;
          this.location.seoDescription = `Looking for a kayaking resort near ${this.location.name}? Sanjivani Farm offers private boating, luxury cottages, and 16 acres of nature.`;
        } 
        else if (intentLower.includes('toy-train')) {
          this.location.heroHeadline = `Resort with Private Toy Train Near ${this.location.name}`;
          this.location.heroSubheadline = `The perfect family getaway! Enjoy unlimited rides on our private Sanjivani Toy Train, surrounded by nature near ${this.location.name}.`;
          this.location.seoDescription = `Best resort with a toy train near ${this.location.name}. Perfect for kids and families, featuring luxury cottages and fun activities.`;
        }
        else if (intentLower.includes('nature') || intentLower.includes('lake')) {
          this.location.heroHeadline = `Pristine Nature & Lake Resort Near ${this.location.name}`;
          this.location.heroSubheadline = `Disconnect from the city and wake up to 700+ coconut trees, tranquil lakes, and pure air near ${this.location.name}.`;
          this.location.seoDescription = `Escape to a beautiful nature resort with lakes near ${this.location.name}. Sanjivani Farm is a 16-acre agritourism paradise.`;
        }
        else if (intentLower.includes('monsoon')) {
          this.location.heroHeadline = `The Best Monsoon Getaway Near ${this.location.name}`;
          this.location.heroSubheadline = `Watch the Konkan landscape come alive this monsoon. Cozy cottages, lush greenery, and hot maharashtrian food await near ${this.location.name}.`;
          this.location.seoDescription = `Plan your monsoon weekend getaway near ${this.location.name}. Experience rain in 16 acres of lush greenery at Sanjivani Farm & Resort.`;
        }
        else if (intentLower.includes('corporate') || intentLower.includes('outing')) {
          this.location.heroHeadline = `Corporate Outing & Day Picnic Near ${this.location.name}`;
          this.location.heroSubheadline = `Spacious lawns, team-building activities, and delicious food. The ideal destination for your next company offsite near ${this.location.name}.`;
          this.location.seoDescription = `Book the best corporate outing and day picnic resort near ${this.location.name}. Huge lawns, great food, and fun activities for teams.`;
        }
        
        // Update SEO
        this.seoService.updateSeo({
          title: dynamicTitle,
          description: this.location.seoDescription,
          keywords: this.location.keywords + ', ' + intentString.toLowerCase(),
          url: `/${intentParam}/${locParam}`
        });

      } else {
        // Fallback or 404
        this.router.navigate(['/']);
      }
    });
  }
}
