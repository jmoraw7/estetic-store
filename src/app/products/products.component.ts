import { Component, ElementRef, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products = [];
  loading: boolean = true;
  error: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private firestoreService: FirestoreService,
    private elementRef: ElementRef
    ) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
      let admin = atob(localStorage.getItem('admin'));
      if (admin == '!*esteticstore*!') {
        this.isAdmin = true;
      }
    }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe(async (productsSnapshot) => {
      this.products = [];
      await productsSnapshot.forEach(async (productData: any) => {
        if (productData.payload.doc.data().status == 1 || (productData.payload.doc.data().status == 0 && this.isAdmin)) {
          await this.products.push({
            id: productData.payload.doc.id,
            data: productData.payload.doc.data()
          }); 
        }
      });
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
    });
  }
}
