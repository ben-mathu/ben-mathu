import { MyDetails } from './../../models/header/header';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() headerData!:  MyDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
