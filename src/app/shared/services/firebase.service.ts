import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Header } from '../models/header/header';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  header$!: Observable<DocumentData[]>;

  constructor(private store: Firestore) {
    this.getHeader();
  }

  getHeader = () => {
    const collectionQuery = collection(this.store, 'header');
    this.header$ = collectionData(collectionQuery);
  }
}
