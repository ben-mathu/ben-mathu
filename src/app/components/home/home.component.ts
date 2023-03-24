import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, OnInit, Input } from '@angular/core';
import { MyDetails } from 'src/app/shared/models/header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myDetails: MyDetails = new MyDetails();

  constructor(private service: FirebaseService) {}

  ngOnInit(): void {
    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
      this.myDetails.techArr = result.val().technologies.split(',');
    });
  }
}
