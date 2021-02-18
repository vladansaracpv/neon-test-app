import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader = new BehaviorSubject<{ status: boolean }>({ status: false });

  loaderStatus$ = this.loader.asObservable();

  constructor() {

  }

  showLoader(id: string = 'global'): void {
    this.loader.next({ status: true });
  }

  hideLoader(id: string = 'global'): void {
    this.loader.next({ status: false });
  }
}
