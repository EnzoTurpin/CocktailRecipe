import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, catchError, tap, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer tous les cocktails
  getAllCocktails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipes`).pipe(
      tap((data) => console.log('Données reçues des cocktails:', data)),
      catchError((error) => {
        console.error('Erreur lors de la récupération des cocktails:', error);
        return of([]);
      })
    );
  }

  // Récupérer un cocktail par son ID
  getCocktailById(id: string): Observable<any> {
    console.log(`Demande de cocktail avec ID: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/recipes/${id}`).pipe(
      tap((response) => {
        console.log("Réponse de l'API pour le cocktail:", response);
      }),
      catchError((error) => {
        console.error(
          `Erreur lors de la récupération du cocktail ${id}:`,
          error
        );
        return of(null);
      })
    );
  }

  // Créer un nouveau cocktail (nécessite authentification)
  createCocktail(cocktailData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recipes`, cocktailData);
  }

  // Mettre à jour un cocktail (nécessite authentification)
  updateCocktail(id: string, cocktailData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/recipes/${id}`, cocktailData);
  }

  // Supprimer un cocktail (nécessite authentification)
  deleteCocktail(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/recipes/${id}`);
  }
}
