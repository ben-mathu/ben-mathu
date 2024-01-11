import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
