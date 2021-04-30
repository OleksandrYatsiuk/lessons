import { StaticPagesService } from '../../core/services/static-pages.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EStaticPages } from 'src/app/core/interfaces/static-pages';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';
import { MessageService, SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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
  options: SelectItem[] = [];
  staticPages = EStaticPages;
  htmlContent = {
    [this.staticPages.privacyPolicy]: '',
    [this.staticPages.termsAndConditions]: ''
  };
  activeLabel: number = this.staticPages.privacyPolicy;
  constructor(
    private http: StaticPagesService,
    private _ts: TranslateService,
    private _cd: ChangeDetectorRef,
    private _ms: MessageService
  ) { }

  ngOnInit(): void {
    this.getPagesContent();
  }

  getPagesContent(): void {
    this.http.getStaticPages().subscribe(result => {
      result.forEach(page => {
        this.htmlContent[page.type] = page.content;
        this.options = [
          { label: this._ts.instant('labels.privacyPolicy'), value: EStaticPages.privacyPolicy },
          { label: this._ts.instant('labels.termsAndConditions'), value: EStaticPages.termsAndConditions }
        ];
        this._cd.detectChanges();
      });
    });
  }

  save(): void {
    this.http.setStaticPage({ type: this.activeLabel, content: this.htmlContent[this.activeLabel] })
      .subscribe(result => {
        this._cd.detectChanges();
        this._ms.add({ severity: 'success', detail: this._ts.instant('updatingSuccess') });
      });
  }
  show(event): void {
    this.activeLabel = event.index + 1;
  }
}
