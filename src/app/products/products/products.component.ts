import { ProductLocation } from '../shared/models/location.model';
import { Product } from '../shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  locations: ProductLocation[];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { products: Product[], locations: ProductLocation[] }) => {
      this.products = data.products;
      this.locations = data.locations;
      this.filteredProducts = data.products;
    });
  }

  editProduct(code: string) {
    this.router.navigate(['/products/edit', code]);
  }

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  filterProducts(filter: { code: string, floor: string, section: string }) {
    this.filteredProducts = this.products.filter(product =>
      product.floor === (filter.floor || product.floor) &&
      product.section === (filter.section || product.section) &&
      product.code.includes(filter.code)
    );
  }
}
