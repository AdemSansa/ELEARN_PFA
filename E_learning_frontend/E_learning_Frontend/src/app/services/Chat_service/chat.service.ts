import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  client: Client;

  constructor(private http :HttpClient) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8081/chat-websocket', // Replace with your WebSocket broker URL
      reconnectDelay: 5000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      onConnect: () => {
        this.client.subscribe('/topic/messages', (message) => {
          console.log('Message received:', JSON.parse( message.body));
        });
      },
      debug: (msg: string) => console.log(msg),
    });

    this.client.activate();
  }

  sendMessage(destination: string, userId: string, content: string) {
    const chatMessage = {
      sender: userId,
      content: content,
      timestamp: new Date().toISOString()
    };
    this.client.publish({
      destination: destination, // WebSocket destination
      body: JSON.stringify(chatMessage) // Send the message as a JSON string
    });
  }








   SaveMessage(message:any): Observable<any> {
    console.log(message);
    
      return this.http.post<any>(`http://localhost:8081/messages`, message);
    }
    LoadOldMessages(): Observable<any> {
      return this.http.get<any>(`http://localhost:8081/messages`);
    }


}