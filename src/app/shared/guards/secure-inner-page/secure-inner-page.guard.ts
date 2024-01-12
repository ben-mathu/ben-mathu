import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable, inject } from '@angular/core';

export const secureInnerPageGuard = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const isAuthenticated = await inject(AuthService).isLoggedIn()
  if (!isAuthenticated) {
    inject(Router).navigate(['admin', 'login']);
  }
  return isAuthenticated;
}
