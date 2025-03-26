// src/app/app.config.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// Vous pouvez nommer cette constante différemment pour éviter le conflit :
export const appConfigRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
