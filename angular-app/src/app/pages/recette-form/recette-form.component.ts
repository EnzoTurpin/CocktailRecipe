import { Component } from '@angular/core';
import { RecetteService } from '../../services/recette.service';
import { Recette } from '../../interfaces/recette.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recette-form',
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.css'],
  imports: [FormsModule],
})
export class RecetteFormComponent {
  // Ajoutez les propriétés manquantes
  recette: Recette = {
    id: '',
    name: '',
    description: '',
    ingredients: [],
    glass_id: '',
    category_id: '',
    garnish: '',
    mainAlcohol: '',
    image: '',
    difficulty: 'Facile',
    preparationTime: '',
  };

  ingredients = [];
  glasses = [];
  categories = [];
  alcohols = [];

  constructor(private readonly recetteService: RecetteService) {}

  // Méthode appelée lors de la soumission du formulaire
  submit() {
    console.log('Recette à enregistrer:', this.recette);
    this.recetteService.createRecette(this.recette).subscribe(
      (response) => {
        if (response) {
          console.log('Recette enregistrée avec succès:', response);
          // Tu peux rediriger ou afficher un message de succès ici
        } else {
          console.error('Erreur lors de la création de la recette');
        }
      },
      (error) => {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
    );
  }

  toggleIngredient(ingredientId: string) {
    if (!Array.isArray(this.recette.ingredients)) {
      this.recette.ingredients = [];
    }

    const index = this.recette.ingredients.indexOf(ingredientId);
    if (index === -1) {
      this.recette.ingredients.push(ingredientId);
    } else {
      this.recette.ingredients.splice(index, 1);
    }
  }
}
