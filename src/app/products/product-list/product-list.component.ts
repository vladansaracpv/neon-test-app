import { Product } from '../shared/models/product.model';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[];
  @Output() editProductEvent = new EventEmitter<string>();
  @Output() addProductEvent = new EventEmitter();

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  editProduct(code: string) {
    this.editProductEvent.emit(code);
  }

  addProduct() {
    this.addProductEvent.emit();
  }

}
