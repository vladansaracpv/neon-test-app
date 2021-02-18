import { debounceTime, delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

let products: Product[] = [
  {
    code: 'MYTZ 123456',
    quantity: 1,
    floor: 'Floor 1',
    section: 'F1/S1'
  },
  {
    code: 'MY 3247',
    quantity: 1,
    floor: 'Floor 1',
    section: 'F1/S2'
  },
  {
    code: 'MX 3200',
    quantity: 1,
    floor: 'Floor 2',
    section: 'F2/S2'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(products);
  }

  getProduct(code: string): Observable<Product> {
    const product = products.find(p => p.code === code);

    return of(product);
  }

  createProduct(product: Product): Observable<Product> {
    products.push(product);

    return of(product).pipe(delay(1500));
  }

  updateProduct(product: Product): Observable<Product> {
    const productId = products.findIndex(p => p.code === product.code);

    products[productId] = product;

    return of(product).pipe(delay(1500));
  }

  deleteProduct(product: Product): Observable<Product> {
    const productId = products.indexOf(product);

    products = products.splice(productId, 1);

    return of(product);
  }

  isUniqueProductCode(code: string): Observable<boolean> {
    const isUnique = products.filter(p => p.code === code).length === 0;

    return of(isUnique);
  }
}
