import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductComponent,
    ProductComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductsModule { }
