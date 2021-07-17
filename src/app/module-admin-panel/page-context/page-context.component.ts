import { StaticPagesService } from '../../core/services/static-pages.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EStaticPages, IStaticPages } from 'src/app/core/interfaces/static-pages';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Observable, pluck } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-page-context',
  templateUrl: './page-context.component.html',
  styleUrls: ['./page-context.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContextComponent implements OnInit {

  config: AngularEditorConfig = {
    sanitize: false
  };
  options: IStaticPages[];
  pages$: Observable<IStaticPages[]>;
  staticPages = EStaticPages;
  htmlContent = {};
  activeLabel: number = null;
  path = {};
  constructor(
    private http: StaticPagesService,
    private _ts: TranslateService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService
  ) { }

  ngOnInit(): void {
    this.pages$ = this.queryPages();
  }

  onSelectPage(page: IStaticPages): void {
    this.activeLabel = page.type;
    if (!this.htmlContent[page.type]) {
      this.htmlContent[page.type] = page.content;
    }
    if (!this.path[page.type]) {
      this.path[page.type] = page.path;
    }

  }

  save(pages: IStaticPages[]): void {

    const page = pages.find(o => o.type === this.activeLabel);
    this.http.queryEditPage({ ...page, content: this.htmlContent[this.activeLabel], path: this.path[this.activeLabel] })
      .subscribe(() => {
        this._ms.add({ severity: 'success', detail: this._ts.instant('updatingSuccess') });
        this._cd.detectChanges();
      });
  }

  show(event): void {
    this.activeLabel = event.index + 1;
  }

  queryPages(): Observable<IStaticPages[]> {
    return this.http.queryPages().pipe(pluck('result'));
  }

}
