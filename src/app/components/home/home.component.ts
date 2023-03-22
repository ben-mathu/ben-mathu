import { DocumentData } from '@angular/fire/firestore';
import { FirebaseService } from './../../shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  headerData!: DocumentData[];

  constructor(private service: FirebaseService) { }

  ngOnInit(): void {
    this.service.header$.subscribe(result => {
      this.headerData = result;
    })
  }
}
