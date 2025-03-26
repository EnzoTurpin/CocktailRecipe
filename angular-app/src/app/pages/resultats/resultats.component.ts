import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Recette {
  nom: string;
  description: string;
  image: string;
  difficulte: string;
}

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ResultatsComponent implements OnInit {
  searchTerm: string = '';
  recettes: Recette[] = [];

  // Données des recettes
  private allRecettes: Recette[] = [
    {
      nom: 'Mojito',
      description:
        'Un cocktail rafraîchissant à base de rhum blanc, menthe fraîche et citron vert',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Facile',
    },
    {
      nom: 'Piña Colada',
      description:
        "Un cocktail tropical à base de rhum blanc, lait de coco et jus d'ananas",
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Moyen',
    },
    {
      nom: 'Margarita',
      description:
        'Un cocktail classique à base de tequila, triple sec et jus de citron vert',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Facile',
    },
    {
      nom: 'Old Fashioned',
      description:
        'Un cocktail sophistiqué à base de whisky, angostura bitters et sucre',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Difficile',
    },
    {
      nom: 'Daiquiri',
      description:
        'Un cocktail rafraîchissant à base de rhum blanc, jus de citron vert et sucre',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Facile',
    },
    {
      nom: 'Cosmopolitan',
      description:
        'Un cocktail élégant à base de vodka, triple sec, jus de cranberry et citron vert',
      image:
        'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop&q=60',
      difficulte: 'Moyen',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'] || '';
      this.filterRecettes();
    });
  }

  private filterRecettes(): void {
    if (!this.searchTerm.trim()) {
      this.recettes = [];
      return;
    }

    this.recettes = this.allRecettes.filter(
      (recette) =>
        recette.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recette.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }
}
