import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';
import { Validators,FormGroup, FormBuilder} from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,private router: Router,    private route: ActivatedRoute,
    private fb: FormBuilder) {}
  authForm! :FormGroup;

  forgotPasswordForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  token: string = ''
  credentials = { email: ''
, password:''}  

StrongPass(Pass : string)
{
  if(Pass.length < 8)
  {
    return "Password must be at least 8 characters long";
  }

  let hasUpperCase = /[A-Z]/.test(Pass);
  let hasLowerCase = /[a-z]/.test(Pass);
  let hasNumeric = /[0-9]/.test(Pass);
  let hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(Pass);
  if (!hasUpperCase) {
    let test1 = true;
    return "1";
    
    
  }
  if (!hasLowerCase) {
    let test2 = true

   return '2';
    
  }
  if (!hasNumeric) {
    let test3 = true
    return  '3';

  }
  return null




}
       strongPasswordValidator(control: any) {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    return !isValid ? { strongPassword: true } : null;
  }

  email: string = '';
  password: string = '';


 

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





  ForgotPassword(): void {
    Swal.fire({
      title: 'Enter your email address',
      input: 'email',
      inputPlaceholder: 'exemple@gmail.com',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (email) => {
        if (!email) {
          return 'You need to enter a valid email address!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value.trim();
        console.log(email);
        this.forgotPassword2(email);
      }
    });
  }
  forgotPassword2(email: string): void {
    console.log('Email:', email); 
    this.authService.forgotPassword(email).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'Password reset link sent to your email.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send reset link',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

private decode(token:string){
  return JSON.parse(atob(token.split(".")[1]));
}


  handleGoogleLogin(response: any): void {
    if (response && response.credential) {
      const payload = this.decode(response.credential);
      console.log('Google Sign-In payload:', payload);

      this.authService.googleLogin(response.credential).subscribe(
        (res) => {
          console.log('Backend response:', res);
          var googlename = payload.name;
          console.log(googlename);
          this.authService.userName=googlename;
          sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
          this.router.navigate(['home']);
          localStorage.setItem('jwtToken', response.token); 
          this.authService.storeToken(response.token);

          this.showAlert();
        },
        (err) => {
          console.error('Error backend auth', err);
          this.showAlertError(err.message || 'Unknown error'); 
        }
      );
    }
  }
  onCreateAccount() {
    Swal.fire({
      title: 'Choose Your Role',
      text: 'Please select your role:',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Teacher',
      cancelButtonText: 'Student',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/register']);
        this.authService.regTeach=true;
      } else if (result.isDismissed) {
        this.router.navigate(['register']);
        this.authService.regTeach=false;
      }
    });
  }


  onSubmit() {
    this.authService.login(this.email,this.password).subscribe({
      next: (response) => {
        const token = response.token; 
        this.authService.storeToken(token);
        console.log('Login successful:', token);
        this.router.navigate(['/home']);
console.log(this.authService.userRole);

      },
      error: (err) => {
        console.error('Login failed:', err);
    this.showAlertError(err.error.message || 'Login failed');
      },
    });
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


  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.authService.forgotPassword(email).subscribe(
        response => {
          Swal.fire({
            title: 'Success',
            text: 'Password reset link sent to your email.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error => {
          Swal.fire({ 
            title: 'Error',
            text: 'Failed to send reset link. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }

  onResetPasswordSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { newPassword } = this.resetPasswordForm.value;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        response => {
          Swal.fire({
            title: 'Success',
            text: 'Your password has been reset successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/login']);
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to reset password. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }
  
}
