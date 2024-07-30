import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { MyDetails } from '../../models/header/header';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(private router: Router) {
    this.auth = getAuth();
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['admin', 'login']);
    }).catch((err) => {
      console.log(err);
    });
  }
}
