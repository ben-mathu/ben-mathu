import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IconService } from './shared/services/icon/icon.service';
import { ThemeManagerService } from './shared/services/theme/theme-manager.service';
import { Utils } from './shared/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  themeManager: ThemeManagerService = inject(ThemeManagerService);

  myDetails!: MyDetails;
  isAuth: boolean = false;
  auth: Auth;
  url: string = '';
  isDashboard: boolean = false;

  locationEvent$;

  /**
   * Location - to get path/url
   */
  constructor(
    private service: FirebaseService,
    private location: Location,
    private router: Router,
    iconsService: IconService,
    private util: Utils
  ) {
    this.auth = getAuth();

    this.locationEvent$ = location.onUrlChange((val) => {
      this.url = val;
      if (val.includes('admin')) {
        this.isDashboard = true;
      } else {
        this.isDashboard = false;
      }
    });

    iconsService.registerIcons();
  }

  ngOnInit() {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
    });

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.util.unsubscribe();
  }
}
