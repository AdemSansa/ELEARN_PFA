import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user:any;
  title = 'E_learning_Frontend';
  ismenuVisble!:boolean;
  isAdmin!:boolean;
  constructor(public auth:AuthService,private router:Router){}
  ngOnInit(): void {
    this.user = this.auth.decodeToken();
    console.log(this.user);
    
    if(this.user!=null){
      this.isAdmin=this.auth.isAdmin();
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

    this.router.navigate(['/login']);

  }
 
  

}
