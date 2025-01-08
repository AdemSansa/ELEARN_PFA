  import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit {
    user: any;
    constructor(private auth:AuthService ,private Appcomp:AppComponent)  { }
    
   
    ngOnInit(): void {
      this.Appcomp.ngOnInit();
        const user = this.auth.decodeToken();
        this.user = user;
      
  }
}