import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  id: any;
  product: any;
  isAdmin: boolean = false;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private firestoreService: FirestoreService
  ) { 
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin') == '*!esteticestore!*') {
      this.isAdmin = true;
    }
    let editSubscribe = this.firestoreService.getProduct(this.id).subscribe((product) => {
      this.product = product.payload.data();
      editSubscribe.unsubscribe();
    });
  }

  verifyAdmin() {
    
  }

}
