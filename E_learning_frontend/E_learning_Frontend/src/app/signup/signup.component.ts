import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var google: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  secretKey: string = '';  
  isTeacher: boolean = true;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.isTeacher = this.authService.regTeach;
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
          localStorage.setItem('jwt', response.token);

          this.showAlert(); 
        },
        (err) => {
          console.error('Error backend auth', err);
          this.showAlertError(err.message || 'Unknown error'); 
        }
      );
    }
  }

 
  onRegister(): void {
    if (this.isTeacher) {
      this.authService.registerTeacher(this.name, this.email, this.password, this.secretKey).subscribe(
        (response) => {
          console.log('Teacher registration successful', response);
          this.router.navigate(['/login']);
          this.showAlertSig();
        },
        (error) => {
          console.error('Teacher registration failed', error);
          this.showAlertError(error.error);        }
      );
    } else {
      this.authService.register(this.name, this.email, this.password).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.showAlertSig();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          if (error.status === 400) {
            this.showAlertError(error.error);
          } else {
            this.showAlertError(error.error.message || 'Unknown error');
          }
        }
      );
    }
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
  async showAlertSig() {
    await Swal.fire({
      title: 'Account Registration Sucsessful!',
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
