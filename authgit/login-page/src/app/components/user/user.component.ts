import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/admin/user.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,BrowserModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponentfetch implements OnInit {
  users: any[] = [];  // Store fetched users
  userToEdit: any = {};  // Store the user to be edited
  isEditMode: boolean = false;  // Flag for switching between edit and create mode

  constructor(private userService: UserService) {}


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log("error fetching user : "+error);
      }
  );}

  ngOnInit(): void {
    this.loadUsers();

  }
  


}
