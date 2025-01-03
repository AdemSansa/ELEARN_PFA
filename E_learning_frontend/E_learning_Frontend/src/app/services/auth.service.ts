


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
  private isTeacher: boolean = false;
  private currentUserSubject: BehaviorSubject<any>;
  userRole: any;
  regTeach: boolean =false;
  Avatar: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const decodedToken = this.decodeToken();
    this.currentUserSubject = new BehaviorSubject<any>(decodedToken);
    this.userName = decodedToken?.name || null;
    this.userRole = decodedToken?.roles?.[0] || null;
   
    
    this.setIsTeacher(); // Ensure role is set correctly at the start
  }

  setIsTeacher(): void {
    this.isTeacher = this.userRole === "ROLE_TEACHER"; 
    localStorage.setItem('isTeacher', JSON.stringify(this.isTeacher));
  }
  

  getIsTeacher(): boolean {
    const storedIsTeacher = localStorage.getItem('isTeacher');
    if (storedIsTeacher !== null) {
      return JSON.parse(storedIsTeacher);
    }
    return this.isTeacher;  
  }

  login(email: string, password: string): Observable<any> {
    this.currentUserSubject.next(this.decodeToken());
    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
 

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  registerTeacher(name: string, email: string, password: string, secretKey: string): Observable<any> {
    const body = { name, email, password, secretKey };
    return this.http.post(`${this.apiUrl}/teacher-register`, body);
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
        return jwtDecode(token);
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
    return this.http.get(`${this.apiUrl}/user-info`, { headers }).pipe(
      tap((response: any) => {
        // Assuming 'response' contains the user info, and it has a 'name' field.
        this.userName = response?.name;        
        this.userRole = response?.role?.[0];
        this.Avatar = response?.avatarURL;
        
        this.setIsTeacher();  // Set teacher flag based on the role
      })
    );

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


  getLoggedInUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current-user`);
  }
  updateAvatar(userId: string, avatarUrl: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}/avatar`, { avatarUrl }, { responseType: 'text' });
  }
  isAdmin(): boolean {
    const roles = this.getUserRoles(); // Get roles from token or localStorage
    return roles.includes('ROLE_ADMIN');
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    const decodedToken = this.decodeToken();
    return decodedToken?.roles || [];
  }

 
}

