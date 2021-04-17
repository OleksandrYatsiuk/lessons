import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Component } from '@angular/core';
import { EnumLanguages, MetaDataService } from 'spm-core';
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
    @Inject(PLATFORM_ID) private platformId: any,
    private _ps: PreloaderService,
    private _cd: ChangeDetectorRef,
    private _md: MetaDataService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this._md.setSiteData('PLC', '/assets/logo.png', EnumLanguages.RUSSIAN);

    this._ps.loading
      .subscribe((isLoad: boolean) => {
        if (isLoad !== null) {
          this.load = isLoad;
        }
        this._cd.detectChanges();
      });
  }
}
