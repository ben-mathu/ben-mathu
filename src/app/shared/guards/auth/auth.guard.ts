import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authInstance$ } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = await this.authService.isLoggedIn();
    if (isAuthenticated) {
      this.router.navigate(['admin']);
    }
    return true;
  }
}
