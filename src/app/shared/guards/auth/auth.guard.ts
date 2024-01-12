import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export class AuthPage {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isLoggedIn = await this.authService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['admin', 'dashboard']);
    }
    return isLoggedIn;
  }
}

export default new AuthPage();
