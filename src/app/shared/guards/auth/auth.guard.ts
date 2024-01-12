import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isLoggedIn = await inject(AuthService).isLoggedIn();

  if (isLoggedIn) {
    inject(Router).navigate(['admin', 'dashboard']);
  }
  return isLoggedIn;
}
