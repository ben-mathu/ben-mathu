import { MyDetails } from 'src/app/shared/models/header/header';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'customn-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() myDetails!: MyDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
