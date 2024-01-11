import { Component } from '@angular/core';
import { MyDetails } from 'src/app/shared/models/header/header';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myDetails!: MyDetails;

  constructor(private service: FirebaseService, private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.set('@Home', 'Home');

    this.service.getHeader().then((result) => {
      this.myDetails = result.val();
      this.myDetails.skillArr = result.val().skills.split(',');
    });
  }
}
