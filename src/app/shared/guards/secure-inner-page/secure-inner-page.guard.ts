import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const secureInnerPageGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(AuthService).isLoggedIn
  if (!isAuthenticated) {
    inject(Router).navigate(['admin', 'login']);
  }
  return true;
};
