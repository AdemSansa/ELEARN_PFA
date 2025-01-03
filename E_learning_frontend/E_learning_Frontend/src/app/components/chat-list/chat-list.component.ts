import { getLocaleFirstDayOfWeek } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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


  constructor(private forumService: ForumService, private route: ActivatedRoute, private authService:AuthService ,private userService:UserService,private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.username =this.authService.decodeToken()?.id || null;
    
    




    this.forumId = this.route.snapshot.paramMap.get('id')!;
    this.forumService.getChatsByForumId(this.forumId).subscribe((data) => {
      this.chats = data;
      console.log(this.chats);
      
      this.chats.forEach(chat => {
        this.userService.getUserByID(chat.createdBy).subscribe((data) => {
          console.log(data);
          
          chat.AvatarURL = data.avatarURL;
          chat.UserName = data.name;
         
          

        });
      }
    );

    });
  }
  newChatText: string = '';

addChat(): void {
 
  const newChat = {
    forumId: this.forumId,
    text: this.newChatText,
    createdBy: this.username,
  };
  console.log(newChat);
  
  this.forumService.addChat(newChat).subscribe((data) => {
    this.chats.push(data);
    this.cdr.detectChanges(); // Manually trigger change detection
    this.ngOnInit();
    //Detect Changes refresh the view



    this.newChatText = ''; // Clear the input
  });
}
}
// make in interface for chat 
export interface Chat {
  forumId: string;
  text: string;
  createdBy: string;
  AvatarURL:string;
  UserName:string;
}