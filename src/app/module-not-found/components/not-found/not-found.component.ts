import { isPlatformServer } from '@angular/common';
import { Inject, Optional, PLATFORM_ID } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  constructor(
    @Optional() @Inject(REQUEST) private request: any,
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      if (this.request.res) {
        this.request.res.status(404);
      }
    }
  }

}
