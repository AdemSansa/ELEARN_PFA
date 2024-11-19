import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private socialAuthService: SocialAuthService) {}

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
  onGoogleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      const googleToken = user.idToken;
      this.authService.googleLogin(googleToken).subscribe(
        response => {
          console.log('Google Login successful', response);
        },
        error => {
          console.error('Google Login failed', error);
        }
      );
    });
  }
}
