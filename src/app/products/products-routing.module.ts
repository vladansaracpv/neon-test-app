import { LocationsResolver } from './shared/resolvers/locations.resolver';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolver } from './shared/resolvers/products.resolver';
import { ProductResolver } from './shared/resolvers/product.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: {
      products: ProductsResolver,
      locations: LocationsResolver
    },
  },
  {
    path: 'add',
    component: AddProductComponent,
    resolve: {
      locations: LocationsResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
    resolve: {
      product: ProductResolver,
      locations: LocationsResolver
    }
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductsRoutingModule { }
