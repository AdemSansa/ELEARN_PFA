import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token;
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = { token, newPassword };
    return this.http.post(`${this.apiUrl}/reset-password`, null, { params: params });
  }
}

