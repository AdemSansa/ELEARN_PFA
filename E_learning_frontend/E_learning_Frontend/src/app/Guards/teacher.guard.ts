import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authS = inject(AuthService);

  console.log('Checking teacherGuard...');
  if (authS.getIsTeacher()) {
    console.log('Access granted: Teacher');
    return true;
  } else {
    console.log('Access denied: Redirecting to /home');
    router.navigate(['/home'], { replaceUrl: true });
    return false;
  }
};