import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Firestore) { }

  ngOnInit(): void {
  }
  
}
