import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any;


  constructor( private Auth:AuthService) { }
  ngOnInit(): void {
    this.user = this.Auth.decodeToken()
    console.log(this.user);

  }

}
