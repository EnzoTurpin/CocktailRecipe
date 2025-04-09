import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecettesComponent } from './pages/recettes/recettes.component';
import { AboutComponent } from './pages/about/about.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recettes', component: RecettesComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
