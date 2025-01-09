import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {
  private baseUrl = 'http://localhost:8081/api/recommendations'; // Update with your backend URL if different

  constructor(private http: HttpClient) {}

  
  getRecommendations(id: string): Observable<any> {
    
    
    return this.http.get<any>(`${this.baseUrl}/recommendations/${id}`);
  }
}