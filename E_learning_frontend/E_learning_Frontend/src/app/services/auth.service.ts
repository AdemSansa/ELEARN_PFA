import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/auth';
  private user: any = null; 
  userName: string | null = null;

  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(this.decodeToken());
    this.userName = this.decodeToken()?.name || null;
  }

  login(email: string, password: string): Observable<any> {
    this.currentUserSubject.next(this.decodeToken());
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
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
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  decodeToken(): any {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  // Decoding the JWT token
        return decodedToken;  // Return decoded token (user info)
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Store token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Updated method to fetch and extract user info including username
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('User not logged in');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headers:', headers);
    return this.http.get(`${this.apiUrl}/user-info`, { headers });
  }

  // Get the current userName
  get userNameValue(): string | null {
    return this.userName;
  }
  getUserId(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.id : null;
  }
  completeProfile(user: any): Observable<any> {

    const url = `${this.apiUrl}/Complete_Profile`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, user, { headers });
  }

 
}
