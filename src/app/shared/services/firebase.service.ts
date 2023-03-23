import { Injectable } from '@angular/core';
import { child, Database, get, ref } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private database: Database) {
  }

  getHeader(): Promise<any> {
    const headerRef = ref(this.database);
    return get(child(headerRef, 'header'));
  }
}
