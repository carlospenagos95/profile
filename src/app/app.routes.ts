import { Routes } from '@angular/router';

import { LandingPage } from './features/landing/landing-page';

export const routes: Routes = [
  // Una sola ruta: la landing es single-page con navegación por anclas.
  // Las futuras (/projects, /blog, /resume) entran aquí con `loadComponent`.
  { path: '', component: LandingPage, title: 'Inicio' },
  { path: '**', redirectTo: '' },
];
