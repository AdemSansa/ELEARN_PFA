import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E_learning_Frontend';
  constructor(public auth:AuthService,private router:Router){}

  logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
