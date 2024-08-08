import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { MyDetails } from '../../models/header/header';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Utils } from '../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() headerData!:  MyDetails;
  @Input() isAuth: boolean = false;
  @Input() isDashboard: boolean = false;
  auth: Auth;

  collapse: boolean = false;

  constructor(private router: Router) {
    this.auth = getAuth();
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['admin', 'login']);
    }).catch((err) => {
      // Error could not sigout
    });
  }

  toggleSocialButtons() {
    this.collapse = !this.collapse;
  }
}
