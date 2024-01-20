import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myDetails!: MyDetails;
  isAuth: boolean = false;
  auth: Auth;
  url: string = '';
  isDashboard: boolean = false;

  locationEvent$;

  /**
   * Location - to get path/url
   */
  constructor(private service: FirebaseService, private location: Location, private router: Router) {
    this.auth = getAuth();

    this.locationEvent$ = location.onUrlChange((val) => {
      this.url = val;
      console.log(this.url);
      if (val.includes('admin')) {
        this.isDashboard = true;
      } else {
        this.isDashboard = false;
      }
    });
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
  }
}
