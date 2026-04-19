import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SplashScreenComponent],
  template: `
    <app-splash-screen />
    <router-outlet />
  `,
  styles: [`
    :host { display: block; min-height: 100vh; }
  `]
})
export class App {}
