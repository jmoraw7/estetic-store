import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductsComponent } from './products/products.component';
import { UpdateProductComponent } from './update-product/update-product.component';


const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  }, { 
    path: 'product/:id', 
    component: DetailProductComponent 
  }, { 
    path: 'update-product/:id', 
    component: UpdateProductComponent 
  }, {
    path: '**',
    redirectTo: '/products'
  }, {
    path: '',
    redirectTo: '/products'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
