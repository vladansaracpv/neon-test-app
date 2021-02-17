import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductLocation } from '../models/location.model';

let locations: ProductLocation[] = [
  {
    floor: {
      id: 1,
      name: 'Floor 1'
    },
    sections: [
      { id: 1, name: 'F1/S1' },
      { id: 2, name: 'F1/S2' },
      { id: 3, name: 'F1/S3' },
    ]
  },
  {
    floor: {
      id: 2,
      name: 'Floor 2'
    },
    sections: [
      { id: 4, name: 'F2/S1' },
      { id: 5, name: 'F2/S2' },
      { id: 6, name: 'F2/S3' },
    ]
  },
  {
    floor: {
      id: 3,
      name: 'Floor 3'
    },
    sections: [
      { id: 7, name: 'F3/S1' },
      { id: 8, name: 'F3/S2' },
      { id: 9, name: 'F3/S3' },
    ]
  }
];


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getFloors(): Observable<ProductLocation[]> {
    return of(locations);
  }

  getFloor(floorId: number): Observable<ProductLocation> {
    const floor = locations.find(f => f.floor.id === floorId);

    return of(floor);

  }

  addFloor(floor: ProductLocation): Observable<ProductLocation> {
    locations.push(floor);
    return of(floor);
  }

  editFloor(floor: ProductLocation): Observable<ProductLocation> {
    const floorId = locations.indexOf(floor);

    locations[floorId] = floor;

    return of(floor);
  }

  deleteFloor(floor: ProductLocation): Observable<ProductLocation> {
    const floorId = locations.indexOf(floor);

    locations = locations.splice(floorId, 1);

    return of(floor);
  }

  getLocations(): Observable<ProductLocation[]> {
    return of(locations);
  }

  getSections(floorId: number) {
    const floor = locations.find(l => l.floor.id === floorId);
    return of(floor.sections);
  }

}
