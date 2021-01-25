import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductsComponent } from 'src/app/products/products.component';

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

  public async deleteProduct(documentId: string) {
    var product = this.firestore.collection('products').doc(documentId);

    await product.delete().then(response => {
      return true;
    });
  }
}