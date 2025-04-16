import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { AuthService } from '../../services/auth.service';
import { RecetteService } from '../../services/recette.service';
import { CocktailService } from '../../services/cocktail.service';
import { Recette } from '../../interfaces/recette.interface';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css'],
})
export class RecettesComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  showSuggestions: boolean = false;
  suggestions: Recette[] = [];
  parallaxOffset: number = 0;
  isAuthenticatedLocally: boolean = false;
  isAuthenticatedOnServer: boolean = false;
  checkingAuth: boolean = false;
  errorMessage: string = '';
  showErrorModal: boolean = false;
  sessionExpiredError: boolean = false;

  recettes: Recette[] = [];

  constructor(
    public router: Router,
    private readonly scrollService: ScrollService,
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    private readonly recetteService: RecetteService,
    private readonly cocktailService: CocktailService
  ) {}

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));

    // Vérifier l'authentification locale sans tenter de logout
    this.isAuthenticatedLocally = this.authService.isAuthenticated();

    // Activer le mode debug pour voir les données reçues de l'API
    this.recetteService.getRecettes().subscribe((data: Recette[]) => {
      console.log("Données reçues de l'API:", data);

      // Condition pour vérifier si les données sont valides
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Mise à jour des recettes avec les données de l'API");
        this.recettes = data;
      } else {
        // Si aucune donnée n'est reçue de l'API, initialiser un tableau vide
        console.log("Aucune donnée reçue de l'API");
        this.recettes = [];
      }

      // Vérifier silencieusement l'authentification côté serveur
      if (this.isAuthenticatedLocally) {
        this.checkingAuth = true;
        this.authService
          .getUserSilent()
          .pipe(
            // Ne jamais laisser cette requête échouer et bloquer la suite
            catchError((error) => {
              console.log(
                "Erreur lors de la vérification silencieuse, on considère l'utilisateur non authentifié côté serveur"
              );
              return of(null);
            })
          )
          .subscribe((user) => {
            this.checkingAuth = false;
            this.isAuthenticatedOnServer = !!user;

            console.log(
              "État d'authentification serveur:",
              this.isAuthenticatedOnServer ? 'Authentifié' : 'Non authentifié'
            );
          });
      }
    });

    // Vérifier l'authentification locale sans tenter de logout
    this.isAuthenticatedLocally = this.authService.isAuthenticated();

    // Activer le mode debug pour voir les données reçues de l'API
    this.recetteService.getRecettes().subscribe((data: Recette[]) => {
      console.log("Données reçues de l'API:", data);

      // Condition pour vérifier si les données sont valides
      if (data && Array.isArray(data) && data.length > 0) {
        console.log("Mise à jour des recettes avec les données de l'API");
        // Vérifier et corriger les IDs si nécessaire
        this.recettes = data.map((recette) => {
          // Utiliser any pour accéder à la propriété _id qui n'est pas dans l'interface Recette
          const recetteAny = recette as any;
          if (!recette.id && recetteAny._id) {
            recette.id = recetteAny._id;
          }

          // Débuggons cet objet
          console.log('Recette après mappage:', recette);
          console.log('ID de la recette:', recette.id);

          return recette;
        });

        // Vérifier les recettes après le mappage
        console.log('Toutes les recettes après mappage:', this.recettes);
      } else {
        // Si aucune donnée n'est reçue de l'API, utiliser des données par défaut
        console.log(
          "Aucune donnée reçue de l'API, utilisation des données par défaut"
        );
        this.recettes = this.getDefaultRecettes();

        // Vérifier les recettes par défaut
        console.log('Recettes par défaut:', this.recettes);
      }

      // Vérifier silencieusement l'authentification côté serveur
      if (this.isAuthenticatedLocally) {
        this.checkingAuth = true;
        this.authService
          .getUserSilent()
          .pipe(
            // Ne jamais laisser cette requête échouer et bloquer la suite
            catchError((error) => {
              console.log(
                "Erreur lors de la vérification silencieuse, on considère l'utilisateur non authentifié côté serveur"
              );
              return of(null);
            })
          )
          .subscribe((user) => {
            this.checkingAuth = false;
            this.isAuthenticatedOnServer = !!user;

            console.log(
              "État d'authentification serveur:",
              this.isAuthenticatedOnServer ? 'Authentifié' : 'Non authentifié'
            );
          });
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  private onScroll() {
    this.parallaxOffset = window.scrollY * 0.5;
  }

  onSearchInput() {
    if (this.searchTerm.length > 0) {
      this.suggestions = this.recettes.filter(
        (recette) =>
          recette.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          recette.description
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
      this.showSuggestions = true;
    } else {
      this.suggestions = [];
      this.showSuggestions = false;
    }
  }

  onSearchSubmit() {
    this.showSuggestions = false;
    // this.router.navigate(['/resultats'], { queryParams: { q: this.searchTerm } });
  }

  navigateToCocktail(id: string) {
    console.log('Navigation vers cocktail avec ID:', id);

    // Vérifier si l'ID est défini
    if (!id) {
      console.warn(
        "ID de cocktail non défini, utilisation d'un ID par défaut (mojito)"
      );
      // Utiliser un ID par défaut
      id = 'mojito';
    }

    // Naviguer vers la page de détails
    this.router.navigate(['/cocktail', id]);
  }

  // Rediriger vers la page de connexion
  redirectToLogin() {
    this.showErrorModal = false;
    this.router.navigate(['/login']);
  }

  get filteredRecettes(): Recette[] {
    if (!this.searchTerm) return this.recettes;
    return this.recettes.filter(
      (recette) =>
        recette.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recette.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }

  // Méthode pour obtenir des recettes par défaut
  private getDefaultRecettes(): Recette[] {
    return [
      {
        id: 'mojito',
        name: 'Mojito',
        description:
          'Un cocktail rafraîchissant à base de rhum, menthe et citron vert.',
        image:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=60',
        difficulty: 'Facile',
        preparationTime: '5 min',
        glass_id: '',
        category_id: '',
        garnish: '',
        mainAlcohol: '',
      },
      {
        id: 'margarita',
        name: 'Margarita',
        description:
          'Cocktail mexicain classique avec tequila, triple sec et jus de citron.',
        image:
          'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=800&auto=format&fit=crop&q=60',
        difficulty: 'Moyen',
        preparationTime: '8 min',
        glass_id: '',
        category_id: '',
        garnish: '',
        mainAlcohol: '',
      },
      {
        id: 'old-fashioned',
        name: 'Old Fashioned',
        description: 'Cocktail sophistiqué à base de whisky, sucre et bitters.',
        image:
          'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop&q=60',
        difficulty: 'Difficile',
        preparationTime: '10 min',
        glass_id: '',
        category_id: '',
        garnish: '',
        mainAlcohol: '',
      },
    ];
  }
}
