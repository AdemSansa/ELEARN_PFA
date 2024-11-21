import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '564318137355-aa2ut1tinklepfman8n40uma9ud4vnca.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      }
    );
    
  }

private decode(token:string){
  return JSON.parse(atob(token.split(".")[1]));
}



handleLogin(response:any){
  if (response && response.credential) {
    const payload = this.decode(response.credential);
    console.log('Google Sign-In payload:', payload);
    this.authService.googleLogin(response.credential).subscribe(
      (res) => {
        console.log('Backend response:', res);
        sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
        this.router.navigate(['home']);
      },
      (err) => {
        console.error('Error backend auth', err);
      }
    );
  }
}

signInWithGitHub() {
  const clientId = 'Ov23liEXvDDjB5IcNyQ4';
  const redirectUri = 'http://localhost:4200/callback';
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
