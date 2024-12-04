import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/auth';
  private user: any = null; 

  constructor(private http: HttpClient,private router:Router) {}

  login(email: string , password: string ): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }
  googleLogin(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google`, { token });
  }
  logout(): void {
    const token = localStorage.getItem('jwtToken');
  if (!token) {
    console.error('No token found for logout');
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe(
    () => {
      console.log('Logout successful');
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
    },
    (error) => {
      console.error('Logout failed:', error);
    }
  );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token.length > 0;
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = { token, newPassword };
    console.log('Params:', params);
    console.log(this.http.post(`${this.apiUrl}/reset-password`,null, { params: params }));
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token:token,
      newPassword:newPassword,
     });
  }
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
    // Store token in localStorage
    storeToken(token: string): void {
      localStorage.setItem('jwtToken', token);
    }

     // Add Authorization header to requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

