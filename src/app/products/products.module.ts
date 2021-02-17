import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [ProductListComponent, ProductsComponent, ProductFiltersComponent, AddProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
