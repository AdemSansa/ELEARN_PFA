  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    private apiUrl = 'http://localhost:8081/auth';

    constructor(private http: HttpClient) {}
    getData() {
      return this.http.get(`${this.apiUrl}/data`);
    }
    login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    register(name: string, email: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, { name, email, password });
    }
    googleLogin(token: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/google`, { token });
    }
    githubLogin(code: string): Observable<any> {
      return this.http.post(`${this.apiUrl} /github`, { code });  
    }
  }
