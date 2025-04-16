import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse {
  data: any[];
  selector: 'app-admin-dashboard';
  templateUrl: './admin-dashboard.component.html';
  standalone: true;
  imports: [CommonModule];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/users`);
  }

  banUser(id: string): Observable<any> {
    return this.http.post(
      `http://localhost:8000/api/users/${id}/ban`,
      {},
      { withCredentials: true }
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/users/${id}`, {
      withCredentials: true,
    });
  }
}
