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
  constructor(
    private firestoreService: FirestoreService,
    private router: Router,
    private elementRef: ElementRef
    ) {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
    }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
        console.log(this.products);
      })
    });
  }

  detail(): void {
    this.router.navigate(['detail'])
  }

}
