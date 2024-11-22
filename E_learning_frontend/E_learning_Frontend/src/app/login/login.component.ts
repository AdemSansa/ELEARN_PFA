import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '564318137355-aa2ut1tinklepfman8n40uma9ud4vnca.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response),
      hl: 'en'
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350,
      }
    );
  }

  private decode(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleGoogleLogin(response: any): void {
    if (response && response.credential) {
      const payload = this.decode(response.credential);
      console.log('Google Sign-In payload:', payload);

      this.authService.googleLogin(response.credential).subscribe(
        (res) => {
          console.log('Backend response:', res);
          sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
          this.router.navigate(['home']);
          this.showAlert(); // Show success alert
        },
        (err) => {
          console.error('Error backend auth', err);
          this.showAlertError(err.message || 'Unknown error'); // Show error alert with the error message
        }
      );
    }
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        sessionStorage.setItem('loggedInUser', JSON.stringify(response));
        this.router.navigate(['home']);
        this.showAlert(); // Show success alert
      },
      (error) => {
        console.error('Login failed', error);
        this.showAlertError(error.error.message || 'Unknown error'); // Show error alert with error message
      }
    );
  }

  async showAlert() {
    await Swal.fire({
      title: 'Welcome!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async showAlertError(errorMessage: string) {
    await Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      showConfirmButton: true,
      timer: 1500,
    });
  }
}
