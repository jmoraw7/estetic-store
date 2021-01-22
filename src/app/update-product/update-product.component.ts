import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    id: new FormControl('')
  });
  @ViewChild('fileBrowser', {static: false}) fileBrowser: ElementRef;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private firestoreService: FirestoreService
  ) { 
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      
    } else {
      this.productForm.setValue({
        id: '',
        name: '',
        description: '',
        image: this.image,
        actual_price: '',
        previus_price: ''
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
    if (documentId == 0) {
      let data = {
        name: form.name,
        description: form.description,
        image: form.image,
        previus_price: form.previus_price,
        actual_price: form.actual_price,
      }
      this.firestoreService.createProduct(data).then(() => {
        this.productForm.setValue({
          id: '',
          name: '',
          description: '',
          image: '',
          actual_price: '',
          previus_price: ''
        });
        alert('producto creado');
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        name: form.name,
        description: form.description,
        image: form.image,
        previus_price: form.previus_price,
        actual_price: form.actual_price,
      }
      this.firestoreService.updateProduct(documentId, data).then(() => {
        this.productForm.setValue({
          id: '',
          name: '',
          description: '',
          image: '',
          actual_price: '',
          previus_price: ''
        });
        alert('producto editado');
      }, (error) => {
        console.log(error);
      });
    }
  }

}
