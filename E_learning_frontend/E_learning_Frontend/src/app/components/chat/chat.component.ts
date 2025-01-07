import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timestamp } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/Chat_service/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

    messages: any[] = [];
    newMessage: string = '';
    Message:any;
    currentUserId:any;

    constructor(private chatService: ChatService,private authService: AuthService ,private userService:UserService) {}
  
    ngOnInit(): void {
      // Load old messages
      this.currentUserId=this.authService.decodeToken()?.id;
      this.chatService.LoadOldMessages().subscribe((data)=>{
        console.log(data);
        data.forEach((element:any) => {
          this.userService.getUserByID(element.sender).subscribe((data2)=>{
            element.name = data2.name;
            element.avatarURL = data2.avatarURL;
          }
          )

          this.messages.push(element);
          this.scrollToBottom();

        });
      });
      // Subscribe to incoming messages
      
      this.chatService.client.onConnect = () => {
        this.chatService.client.subscribe('/topic/messages', (message) => {
          console.log('Message received:', JSON.parse(message.body));
          const messageData = JSON.parse(message.body);
           // Add the incoming message to the array
          this.userService.getUserByID(JSON.parse(message.body)?.sender).subscribe
          ((data)=>{
            console.log(data.name);

            messageData.name = data.name;
            messageData.avatarURL = data.avatarURL;
            
            this.messages.push(messageData);
          console.log("check this "+ this.messages);
          
          }
          )
          
        });
      };
      this.scrollToBottom();
    }
  
    sendMessage(): void {
      if (this.newMessage.trim()) {
        // Send message to the destination topic
        this.Message={content:this.newMessage,sender:this.authService.decodeToken()?.id,timestamp:new Date().toISOString()};

        this.chatService.sendMessage('/topic/messages',this.authService.decodeToken()?.id, this.newMessage);
        console.log(this.Message);
        
        
        this.chatService.SaveMessage(this.Message).subscribe((data)=>{
          console.log(data);
        })
        this.newMessage = ''; // Clear the input field
      }
      this.scrollToBottom();
    }
   
   
    ngAfterViewChecked(): void {
      this.scrollToBottom();
    }
  
    scrollToBottom(): void {
      if (this.scrollAnchor) {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
}
