import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Ensure it's a standalone component
  imports: [CommonModule],  // ✅ Import CommonModule for *ngFor
})
export class AppComponent {
  recipes = [
    { name: 'Margarita', image: 'path/to/margarita.jpg' },
    { name: 'Old Fashioned', image: 'path/to/old-fashioned.jpg' },
    { name: 'Mojito', image: 'path/to/mojito.jpg' }
  ];

  tips = [
    { title: 'Comment battre avec un fouet', content: 'Lorem ipsum dolor sit amet...' },
    { title: 'Cocktail végétalien', content: 'Lorem ipsum dolor sit amet...' }
  ];
}
