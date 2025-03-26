import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';

interface Recette {
  id: number;
  nom: string;
  image: string;
  description: string;
}

interface Tip {
  id: number;
  nom: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
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
    }
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

  tips: Tip[] = [
    {
      id: 1,
      nom: 'Comment battre avec un fouet',
      description: 'Petit tuto pour apprendre à battre avec un fouet',
    },
    {
      id: 2,
      nom: 'Cokctail végétalien',
      description : 'cliquez ici pour découvrir des cocktails 100% bla bla',
    },
  ]
}
