import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  image: any;
  id: any;
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    actual_price: new FormControl('', Validators.required),
    previus_price: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  loading: boolean = false;
  @ViewChild('fileBrowser', {static: false}) fileBrowser: ElementRef;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
  ) { 
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.loading = true;
      let editSubscribe = this.firestoreService.getProduct(this.id).subscribe((product) => {
        let p = product.payload.data();
        this.productForm.controls['name'].setValue(p.name);
        this.productForm.controls['description'].setValue(p.description);
        this.productForm.controls['previus_price'].setValue(p.previus_price);
        this.productForm.controls['actual_price'].setValue(p.actual_price);
        this.productForm.controls['image'].setValue(p.image);
        this.productForm.controls['status'].setValue(p.status);
        this.loading = false;
        editSubscribe.unsubscribe();
      }, error => {
        this.loading = false;
      });
    }
  }

  takePicture() {
    this.fileBrowser.nativeElement.click();
  }

  async onUploadChange(evt: any) {
    const files = evt.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const reader = new FileReader();
        reader.onload = await this.handleReaderLoaded.bind(this);
        await reader.readAsBinaryString(file);
      }      
    }
  }

  async handleReaderLoaded(e) {
    this.image = 'data:image/png;base64,' + btoa(e.target.result);
    this.productForm.controls['image'].setValue(this.image);
  }

  public save(form, documentId = this.id) {
    if(this.loading) {
      return;
    }
    if(!form.name || !form.description || !form.image || !form.previus_price || !form.actual_price || !form.status) {
      alert('¡Por favor verificar los campos ingresados!');
      return;
    }
    this.loading = true;
    if (documentId == 0) {
      let data = {
        name: form.name,
        description: form.description,
        image: form.image,
        previus_price: form.previus_price,
        actual_price: form.actual_price,
        status: form.status
      }
      this.firestoreService.createProduct(data).then(() => {
        this.productForm.setValue({
          id: '',
          name: '',
          description: '',
          image: '',
          actual_price: '',
          previus_price: '',
          status: ''
        });
        this.loading = false;
        alert('¡Producto creado correctamente!');
        this.router.navigate(['products']);
      }, (error) => {
        this.loading = false;
        alert('Ocurrio un error, por favor intente más tarde.');
      });
    } else {
      let data = {
        name: form.name,
        description: form.description,
        image: form.image,
        previus_price: form.previus_price,
        actual_price: form.actual_price,
        status: form.status
      }
      this.firestoreService.updateProduct(documentId, data).then(() => {
        this.productForm.setValue({
          id: '',
          name: '',
          description: '',
          image: '',
          actual_price: '',
          previus_price: '',
          status: ''
        });
        this.loading = false;
        alert('¡Producto editado correctamente!');
        this.router.navigate(['product/' + documentId]);
      }, (error) => {
        this.loading = false;
        alert('Ocurrio un error, por favor intente más tarde.');
      });
    }
  }

}
