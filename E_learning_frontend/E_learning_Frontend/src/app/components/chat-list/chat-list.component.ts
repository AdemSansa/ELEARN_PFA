import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ForumService } from 'src/app/services/forum-service/forum.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit {
  chats: any[] = [];
  forumId: string = '';
  token :string |null = ''; 
  username:string |null = '';
  user:any;


  constructor(private forumService: ForumService, private route: ActivatedRoute, private authService:AuthService ,private userService:UserService) {}

  ngOnInit(): void {
    
    this.username =this.authService.decodeToken()?.name || null;
    
    

    this.forumId = this.route.snapshot.paramMap.get('id')!;
    this.forumService.getChatsByForumId(this.forumId).subscribe((data) => {
      this.chats = data;
    });
  }
  newChatText: string = '';

addChat(): void {
  const newChat = {
    forumId: this.forumId,
    text: this.newChatText,
    createdBy: this.username, // Replace with actual user logic
  };
  this.forumService.addChat(newChat).subscribe((data) => {
    this.chats.push(data);
    this.newChatText = ''; // Clear the input
  });
}
}