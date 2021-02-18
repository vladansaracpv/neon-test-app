import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show: boolean;
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderStatus$.subscribe((response: { status: boolean }) => {
      this.show = response.status;
    });
  }

}
