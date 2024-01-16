import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { MyDetails } from './../../models/header/header';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() headerData!:  MyDetails;
  auth: Auth;
  isAuth: boolean = false;

  constructor(private router: Router) {
    this.auth = getAuth();
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['admin', 'login']);
    }).catch((err) => {
      console.log(err);
    })
  }
}
