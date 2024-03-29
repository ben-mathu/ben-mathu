import { MyDetails } from 'src/shared/models/header/header';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() myDetails!: MyDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
