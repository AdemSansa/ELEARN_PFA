import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {
  private baseUrl = 'http://localhost:8081/api/recommendations'; // Update with your backend URL if different

  constructor(private http: HttpClient) {}

  getRecommendedCourses(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${userId}`);
  }

  getRecommendations(user: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/recommendations`, user);
  }
}
