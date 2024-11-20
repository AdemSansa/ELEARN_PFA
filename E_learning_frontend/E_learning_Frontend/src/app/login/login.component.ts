import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  githubToken: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '599511319412-ictkfbprruobkcavkecbem8u3nkjdn6k.apps.googleusercontent.com' // Your Google client ID here
      });
    });
  }

  loginWithGoogle() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn().then((googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token; // Get Google ID token
      this.authService.googleLogin(id_token).subscribe(
        (response) => {
          console.log('Google login successful', response);
          this.router.navigate(['/home']);  
        },
        (error) => {
          console.error('Google login failed', error);
        }
      );
    });
  }



  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  // GitHub login process when user clicks the button
  loginWithGithub(): void {
    const clientId = 'Ov23liEXvDDjB5IcNyQ4';  // Your GitHub client ID
    const redirectUri = 'http://localhost:4200/auth/callback';  // Your frontend callback URL
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubUrl;
  }

  // Handle the GitHub callback after the user is redirected back
  handleGithubCallback(code: string): void {
    // Make the call to the backend to exchange the `code` for an access token
    this.authService.githubLogin(code).subscribe(
      response => {
        console.log('GitHub login successful', response);
        this.router.navigate(['/home']);  // Redirect to the home page after successful login
      },
      error => {
        console.error('GitHub login failed', error);
        alert('GitHub login failed. Please try again.');
      }
    );
  }
}