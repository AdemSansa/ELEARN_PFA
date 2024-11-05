import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule], // Add FormsModule here

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    this.authService.register(this.username, this.email, this.password).subscribe(
      response => {
        console.log('Registration successful', response);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
