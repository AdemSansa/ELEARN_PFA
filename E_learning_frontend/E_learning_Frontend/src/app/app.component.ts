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
export class AppComponent {
  user:any;
  title = 'E_learning_Frontend';
  ismenuVisble!:boolean;
  constructor(public auth:AuthService,private router:Router){}
  
 
   
  
  ngDoCheck(): void {
    let currentroute=this.router.url;
    if(currentroute=='/login' || currentroute=='/register'){
      this.ismenuVisble=false;
    }else{
      this.ismenuVisble=true;
    }
    }
  logout(){
    this.auth.logout();
    var tokencheck = localStorage.getItem('jwtToken');
    console.log(tokencheck);
    this.router.navigate(['/login']);
  }
 

}
