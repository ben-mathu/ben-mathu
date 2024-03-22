import { AuthService } from 'src/shared/services/auth/auth.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) {
    authService.navigateToAdmin();
  }
  return true;
}
