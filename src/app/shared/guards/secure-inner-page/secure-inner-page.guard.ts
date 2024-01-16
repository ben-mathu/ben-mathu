import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const secureInnerPageGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const isAuthenticated = await authService.isLoggedIn();

  if (!isAuthenticated) {
    authService.navigateToLoginPage();
  }
  return true;
}
