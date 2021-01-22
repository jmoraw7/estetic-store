import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore
  ) {}

  public createProduct(data: any) {
    return this.firestore.collection('products').add(data);
  }

  public getProduct(documentId: string) {
    return this.firestore.collection('products').doc(documentId).snapshotChanges();
  }

  public getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  public updateProduct(documentId: string, data: any) {
    return this.firestore.collection('products').doc(documentId).set(data);
  }
}