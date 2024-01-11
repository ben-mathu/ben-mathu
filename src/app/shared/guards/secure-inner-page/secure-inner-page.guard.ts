import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SecureInnerPageGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = await this.authService.isLoggedIn()
    if (!isAuthenticated) {
      this.router.navigate(['admin', 'login']);
    }
    return true;
  }
};
