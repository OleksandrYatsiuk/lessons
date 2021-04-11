import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PreloaderService } from './core/services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  load = false;
  constructor(
    private _ps: PreloaderService,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._ps.loading
      .subscribe((isLoad: boolean) => {
        if (isLoad !== null) {
          this.load = isLoad;
        }
        this._cd.detectChanges();
      });
  }
}
