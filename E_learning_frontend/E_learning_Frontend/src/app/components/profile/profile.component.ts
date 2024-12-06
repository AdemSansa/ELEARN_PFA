import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;


  constructor( private Auth:AuthService) { }
  ngOnInit(): void {
    this.user = this.Auth.getUserInfo().subscribe((data)=>{
     
      this.user = data;
      console.log(this.user);
    });

  console.log(this.user);
  }
 
  
  

}
