import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PreloaderService } from './core/services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements AfterViewInit {
  title = '';
  loading = false;
  constructor(
    private loadService: PreloaderService,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngAfterViewInit(): void {
    this.loadService.loading
      .subscribe(load => { this.loading = load; this.cdr.detectChanges(); });
  }
}
