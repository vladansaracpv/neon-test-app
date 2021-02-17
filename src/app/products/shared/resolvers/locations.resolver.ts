import { LocationService } from '../services/location.service';
import { ProductLocation } from '../models/location.model';
import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsResolver implements Resolve<ProductLocation[]> {
  constructor(
    private locationService: LocationService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductLocation[]> {

    return this.locationService.getLocations();
  }
}
