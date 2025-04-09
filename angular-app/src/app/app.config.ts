// src/app/app.config.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app-routing.module';

// Vous pouvez nommer cette constante différemment pour éviter le conflit :
export const appConfigRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};
