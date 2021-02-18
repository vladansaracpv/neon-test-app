import { ProductLocation } from '../shared/models/location.model';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {

  editProductForm: FormGroup;
  submitted = false;

  locations: ProductLocation[];
  floors: string[] = [];
  sections: string[] = [];

  location$: Subscription;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) { }

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

    this.loaderService.showLoader();

    const product: Product = this.editProductForm.value;

    this.productService.updateProduct(product)
      .pipe(first())
      .subscribe(() => {
        this.loaderService.hideLoader();
        this.router.navigate(['/products']);
      });
  }

}
