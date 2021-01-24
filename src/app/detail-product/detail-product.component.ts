import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  error: boolean = false;
  loading: boolean = true;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
  ) { 
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    let admin = atob(localStorage.getItem('admin'));
    if (admin == '!*esteticstore*!') {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    let editSubscribe = this.firestoreService.getProduct(this.id).subscribe((product) => {
      this.product = product.payload.data();
      this.loading = false;
      editSubscribe.unsubscribe();
    }, (error) => {
      this.loading = false;
      this.error = true;
    });
  }

  delete() {
    // this.loading = true;
    // this.firestoreService.deleteProduct(this.id).then(() => {
    //   this.loading = false;
    //   alert('¡Producto eliminado correctamente!');
    //   this.router.navigate(['products']);
    // }, (error) => {
    //   alert('Ocurrio un error intetnando eliminar el producto, por favor intente más tarde.');
    // });
  }

}
