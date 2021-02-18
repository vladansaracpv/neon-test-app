import { ProductLocation } from '../shared/models/location.model';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  editProductForm: FormGroup;
  loading = false;
  submitted = false;
  locations: ProductLocation[];

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  floors: string[] = [];
  sections: string[] = [];

  location$: Subscription;

  ngOnInit() {
    this.editProductForm = this.fb.group({
      code: [''],
      quantity: [1, Validators.required],
      floor: ['', Validators.required],
      section: ['', Validators.required]
    });

    this.route.data.subscribe((data: { product: Product, locations: ProductLocation[] }) => {
      this.locations = data.locations;
      this.floors = data.locations.map(l => l.floor.name);
      this.sections = data.locations.find(f => f.floor.name === data.product.floor).sections.map(s => s.name);

      this.editProductForm.patchValue({ ...data.product });
    });

    this.location$ = this.editProductForm.get('floor').valueChanges.subscribe(floor => {
      if (floor) {
        this.sections = this.locations.find(l => l.floor.name === floor).sections.map(s => s.name);
        this.editProductForm.get('section').enable();
        this.editProductForm.get('section').setValue('');
      } else {
        this.editProductForm.get('section').disable();
        this.editProductForm.get('section').setValue('');
      }
    });

  }

  ngOnDestroy() {
    this.location$.unsubscribe();
  }

  get form() {
    return this.editProductForm.controls;
  }

  editProduct() {
    this.submitted = true;

    if (!this.editProductForm.valid) { return; }

    this.loading = true;

    const product: Product = this.editProductForm.value;

    this.productService.updateProduct(product)
      .pipe(first())
      .subscribe(result => {
        this.router.navigate(['/products']);
      });
  }

}
