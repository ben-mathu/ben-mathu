import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/shared/models/header/header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  headerData!: Header;

  constructor(private service: FirebaseService) {
    this.service.getHeader().then((result) => {
      this.headerData = result.val();
      console.log(this.headerData);
      this.headerData.skillArr = result.val().skills.split(',');
      this.headerData.techArr = result.val().technologies.split(',');
    });
  }

  ngOnInit(): void {}
}
