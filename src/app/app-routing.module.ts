import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products'
  }, {
    path: 'products',
    component: ProductsComponent
  }, { 
    path: 'product/:id', 
    component: DetailProductComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
