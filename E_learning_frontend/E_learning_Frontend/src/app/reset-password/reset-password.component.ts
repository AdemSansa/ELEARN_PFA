import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token from URL:', this.token); 
    });
  }

  get newPasswordControl() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPasswordControl() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
        if (newPassword !== confirmPassword) {
        Swal.fire({
          title: 'Error!',
          text: 'Passwords do not match!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
      this.authService.resetPassword(this.token, newPassword).subscribe(
        (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Your password has been reset successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigate(['/login']);
        },
        (error) => {
          let errorMessage = 'Failed to reset password. Please try again.';
          if (error.status === 400) {
            errorMessage = 'Invalid token or token expired. Please request a new password reset link.';
          } else if (error.status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
          }
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      );}}}