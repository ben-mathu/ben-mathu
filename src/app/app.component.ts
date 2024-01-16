import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myDetails!: MyDetails;
  isAuth: boolean = false;
  auth: Auth;
  url: string = '';

  constructor(private service: FirebaseService, private router: Router, private location: Location) {
    this.auth = getAuth();
  }

  ngOnInit() {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
    });

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    this.url = this.location.path();
  }
}
