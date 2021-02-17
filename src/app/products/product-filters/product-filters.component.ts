import { Subject } from 'rxjs';
import { ProductLocation } from '../shared/models/location.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent implements OnInit {
  @Input() locations: ProductLocation[];
  @Output() filterEvent = new EventEmitter<{ code: string, floor: string, section: string }>();

  floors: string[] = [];
  sections: string[] = [];

  filter = {
    code: '',
    floor: '',
    section: ''
  };

  searchSubject$ = new Subject<string>();

  constructor() { }

  ngOnInit() {
    this.floors = this.locations.map(l => l.floor.name);

    this.searchSubject$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((searchValue: string) => {
      this.filter.code = searchValue;
      this.filterEvent.emit(this.filter);
    });
  }

  addFilter(type: string, value: string) {

    this.filter[type] === value ?
      this.filter[type] = '' :
      this.filter[type] = value;

    if (type === 'floor') {
      this.filter.section = '';
    }

    if (this.filter[type] && type === 'floor') {
      this.sections = this.locations.find(l => l.floor.name === this.filter[type]).sections.map(s => s.name);
    }
    this.filterEvent.emit(this.filter);

  }

  searchValueChange(code: string) {
    this.searchSubject$.next(code);
  }

}
