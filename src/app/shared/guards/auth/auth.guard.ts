import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authInstance$ } from '@angular/fire/auth';

export const authGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isLoggedIn = await inject(AuthService).isLoggedIn();

  if (isLoggedIn) {
    inject(Router).navigate(['admin', 'dashboard']);
  }
  return isLoggedIn;
}
