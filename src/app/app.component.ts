import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
    @Inject(DOCUMENT) private _doc: Document,
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
    this._meta.addTags(
      [
        { property: 'og:image', content: this._doc.location.origin + '/assets/img/seo-image.png' },
        { property: 'og:locate', content: 'uk_UA' },
        { property: 'og:url', content: this._doc.URL },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Practical Legal Courses' },
        { property: 'og:description', content: 'Курс процесуальних документів для студентів юридичного факультету та юристів' }
      ]);
  }
}
