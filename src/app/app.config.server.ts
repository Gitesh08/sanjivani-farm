import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { gsap } from 'gsap';

// Disables GSAP's internal requestAnimationFrame ticker on the server to prevent
// Angular SSR from hanging and throwing the "Application did not stabilize" error.
gsap.ticker.sleep();

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
