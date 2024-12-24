import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-avatar-selection',
  templateUrl: './avatar-selection.component.html',
  styleUrls: ['./avatar-selection.component.css']
})
export class AvatarSelectionComponent implements OnInit {
  avatars = [
    '/assets/avatars/avatar1.png',
    '/assets/avatars/avatar2.png',
    '/assets/avatars/avatar3.png',
    '/assets/avatars/avatar4.png',
  ];
  selectedAvatar: string = '';
  userId: string = '';
  token :string |null = ''; 
  id: string |null = '';
  user:any;

  constructor(private userService: UserService, private authService: AuthService ,private router:Router) {}

  ngOnInit() {
    this.id =this.authService.decodeToken()?.id || null;
    this.user = this.authService.getUserInfo();
    this.userId = this.id || '';
    this.selectedAvatar = this.user.avatarUrl || this.avatars[0]; // Default selection
   
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  saveAvatar() {
    this.authService.updateAvatar(this.userId, this.selectedAvatar).subscribe(() => {
      alert('Avatar updated successfully!');
      this.router.navigate(['/home']); // Redirect to home page
    });
  }
}