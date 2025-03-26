import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (!this.acceptTerms) {
      alert("Veuillez accepter les conditions d'utilisation");
      return;
    }

    // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
    console.log('Formulaire soumis:', {
      name: this.name,
      email: this.email,
      password: this.password,
      acceptTerms: this.acceptTerms,
    });
  }
}
