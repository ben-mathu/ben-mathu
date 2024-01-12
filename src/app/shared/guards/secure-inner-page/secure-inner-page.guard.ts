import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export class SecurePages {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  secureInnerPageGuard = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const isAuthenticated = await this.authService.isLoggedIn()
    if (!isAuthenticated) {
      this.router.navigate(['admin', 'login']);
    }
    return isAuthenticated;
  }
}

export default new SecurePages();
