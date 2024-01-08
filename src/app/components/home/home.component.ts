import { Component } from '@angular/core';
import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myDetails!: MyDetails;

  constructor(private service: FirebaseService) {}

  ngOnInit() {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
    });
  }
}
