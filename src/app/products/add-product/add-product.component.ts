import { Product } from '../shared/models/product.model';
import { ProductLocation } from '../shared/models/location.model';
import { ProductService } from '../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  addProductForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  locations: ProductLocation[];
  floors: string[] = [];
  sections: string[] = [];

  location$: Subscription;

  ngOnInit() {
    this.addProductForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^([A-Z]){4,6} ([0-9]){4,6}$/)]],
      quantity: [1, Validators.required],
      floor: ['', Validators.required],
      section: ['', Validators.required]
    });

    this.route.data.subscribe((data: { locations: ProductLocation[] }) => {
      this.locations = data.locations;
      this.floors = data.locations.map(l => l.floor.name);
      this.sections = data.locations[0].sections.map(s => s.name);
    });

    this.addProductForm.get('floor').valueChanges.subscribe(floor => {
      this.sections = this.locations.find(l => l.floor.name === floor).sections.map(s => s.name);
    });
  }

  ngOnDestroy() {
    this.location$.unsubscribe();
  }

  get form() {
    return this.addProductForm.controls;
  }

  addProduct() {
    this.submitted = true;

    if (!this.addProductForm.valid) { return; }

    this.loading = true;

    const product: Product = this.addProductForm.value;

    this.productService.createProduct(product)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/products']);
      });
  }

}
