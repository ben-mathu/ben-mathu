import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from './shared/services/firebase.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myDetails!: MyDetails;

  constructor(private service: FirebaseService) {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
      this.myDetails.techArr = result.val().technologies.split(',');
    });
  }
}
