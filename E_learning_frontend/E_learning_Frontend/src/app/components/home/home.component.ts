  import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    user: any;
    constructor(private auth:AuthService) { }

   
      ngOnInit(): void {
        this.auth.getUserInfo().subscribe(
          (userInfo) => {
            console.log('User Info:', userInfo);
            // You can store the user info in a service or a state management library for reuse
            this.user = userInfo;
          },
          (error) => {
            console.error('Failed to fetch user info:', error);
          }
        );
    
   
  }
}