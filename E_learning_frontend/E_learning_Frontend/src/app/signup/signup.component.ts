  import { Component } from '@angular/core';
  import { AuthService } from '../auth.service';
  import { CommonModule } from '@angular/common';
  import {FormsModule} from '@angular/forms';
  import { NgModule } from '@angular/core';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent {
    name: string = '';
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router:Router) {}

    onRegister() {
   
      this.authService.register(this.name, this.email, this.password).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 400 && error.error === "User already exists") {
            console.error('User already exists');
            alert('Username or email already exists. Please try again with a different one.');
          } else {
            console.error('Registration failed', error);
          }
        }
      );
    }
    }