import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private elementRef: ElementRef
    ) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
    }

  ngOnInit(): void {
    localStorage.setItem('admin', btoa('*!esteticestore!*'));
    this.firestoreService.getProducts().subscribe(async (productsSnapshot) => {
      this.products = [];
      await productsSnapshot.forEach(async (productData: any) => {
        await this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      });
      this.loading = false;
    }, error => {
      this.loading = false;
      this.error = true;
    });
  }
}
