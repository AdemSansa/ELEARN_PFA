import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('toggleChat', [
      state(
        'hidden',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        })
      ),
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('hidden <=> visible', [
        animate('300ms ease-in-out'), // Duration and easing
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  user:any;
  isChatVisible = false; // Initial state: Chat is hidden
  isButtonVisible = false; // Initial state: Button is hidden
  title = 'E_learning_Frontend';
  ismenuVisble!:boolean;
  isAdmin!:boolean;
  private userSubscription!: Subscription;

  constructor(public auth:AuthService,private router:Router, private userService : UserService , private cdr : ChangeDetectorRef){}
  ngOnInit(): void {

    this.loadUserData();

    this.userSubscription = this.auth.userLoggedIn.subscribe(() => {
      this.loadUserData();
    });
    const Token = this.auth.decodeToken();
    this.user = Token;
    this.cdr.detectChanges(); // Force update

    
    if(this.user!=null){
      this.isAdmin=this.isAdminf();
    }
  }
 
  navigateToAdmin(): void {
    this.router.navigate(['/admin']); // Replace '/admin' with the admin interface route
  }
   
  
  ngDoCheck(): void {
    let currentroute=this.router.url;
    if(currentroute=='/login' || currentroute=='/register' || currentroute=='/admin' || currentroute=='/admin/statistics' || currentroute=='/admin/users' ){
      this.ismenuVisble=false;
    }else{
      this.ismenuVisble=true;
    }
    }
  logout(){
    this.auth.logout();
    this.ngOnInit();
    var tokencheck = localStorage.getItem('jwtToken');
    console.log(tokencheck);
    this.isAdmin=false;
    this.isChatVisible = false;
    this.router.navigate(['/login']);

  }

  toggleChat(): void {
    this.isChatVisible = !this.isChatVisible;
  }


  loadUserData(): void {
    const token = this.auth.decodeToken();
    this.user = token;

    if (this.user != null) {
      this.isAdmin = this.isAdminf();
    }
  }
  isLoggedIn(): boolean {
    const token = this.auth.getToken();
    return token !== null && token.length > 0;
  }

  isAdminf(): boolean {
    const roles = this.auth.getUserRoles(); // Get roles from token or localStorage
    return roles.includes('ROLE_ADMIN');
  }
 
  

}
