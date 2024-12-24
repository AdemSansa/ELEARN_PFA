import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:8081/api'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all forums
  getForums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/forums`);
  }

  // Fetch all chats for a specific forum
  getChatsByForumId(forumId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chats/forum/${forumId}`);
  }

  // Add a chat to a specific forum
  addChat(chat: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chats/add`, chat);
  }
}
