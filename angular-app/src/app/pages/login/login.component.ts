import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit(): void {
    // TODO: Implémenter la logique de connexion
    console.log('Login attempt:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
