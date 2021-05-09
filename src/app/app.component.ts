import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { PreloaderService } from './core/services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  load = false;
  isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private _pid: any,
    private _ps: PreloaderService,
    private _cd: ChangeDetectorRef,
    private _meta: Meta
  ) {
    this.isBrowser = isPlatformBrowser(_pid);
  }

  ngOnInit(): void {
    this._ps.loading
      .subscribe((isLoad: boolean) => {
        if (isLoad !== null) {
          this.load = isLoad;
        }
        this._cd.detectChanges();
      });
    this._meta.addTag({ property: 'og:image', content: '/assets/img/seo-image.png' });
  }
}
