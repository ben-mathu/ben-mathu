import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  navigateToAdmin() {
    this.router.navigate(['admin']);
  }

  navigateToLoginPage() {
    this.router.navigate(['admin', 'login']);
  }

  async isLoggedIn() {
    return await this.getSignedInUser();
  }

  getSignedInUser = function() {
    return new Promise<boolean>(function (resolve, reject) {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
