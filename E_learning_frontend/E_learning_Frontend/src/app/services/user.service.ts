import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8081/Admin';

  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<any> {

    return this.http.get(`${this.baseUrl}/getAllUsers`);

    
  }
  deleteUser(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }   
  getUserByID(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserById/${id}`);
  }
  updateUserRoles(userId: string, roles: string[]): Observable<any> {
    return this.http.put(`/api/users/${userId}/roles`, roles);
  }
  
  getMostEnrolledUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/topUsers`);
}

editUser(id: string, user: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/edit/${id}`, user);


}
}
