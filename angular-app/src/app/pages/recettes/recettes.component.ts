import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Recette {
  id: number;
  nom: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-recettes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css'],
})
export class RecettesComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  parallaxOffset: number = 0;
  private scrollListener: () => void;

  recettes: Recette[] = [
    {
      id: 1,
      nom: 'Mojito',
      image: 'assets/images/mojito.jpg',
      description: 'Un cocktail rafraîchissant à base de rhum et de menthe',
    },
    {
      id: 2,
      nom: 'Piña Colada',
      image: 'assets/images/pina-colada.jpg',
      description:
        "Un cocktail tropical à base de rhum, de lait de coco et de jus d'ananas",
    },
    {
      id: 3,
      nom: 'Margarita',
      image: 'assets/images/margarita.jpg',
      description: 'Un cocktail mexicain à base de tequila et de citron vert',
    },
    {
      id: 4,
      nom: 'Old Fashioned',
      image: 'assets/images/old-fashioned.jpg',
      description: "Un cocktail classique à base de whisky et d'angostura",
    },
    {
      id: 5,
      nom: 'Daiquiri',
      image: 'assets/images/daiquiri.jpg',
      description: 'Un cocktail cubain à base de rhum et de citron vert',
    },
    {
      id: 6,
      nom: 'Cosmopolitan',
      image: 'assets/images/cosmopolitan.jpg',
      description: 'Un cocktail élégant à base de vodka et de cranberry',
    },
  ];

  constructor() {
    this.scrollListener = () => {
      const scrolled = window.pageYOffset;
      this.parallaxOffset = scrolled * 0.5;
    };
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  get filteredRecettes(): Recette[] {
    return this.recettes.filter(
      (recette) =>
        recette.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        recette.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }
}
