import { StaticPagesService } from '../../core/services/static-pages.service';
import { Component, OnInit } from '@angular/core';
import { EStaticPages } from 'src/app/core/interfaces/static-pages';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AngularEditorConfig } from '@kolkov/angular-editor/lib/config';

@Component({
  selector: 'app-page-context',
  templateUrl: './page-context.component.html',
  styleUrls: ['./page-context.component.scss']
})
export class PageContextComponent implements OnInit {

  config: AngularEditorConfig = {
    sanitize: false
  };
  staticPages = EStaticPages;
  htmlContent = {
    [this.staticPages.privacyPolicy]: '',
    [this.staticPages.termsAndConditions]: ''
  };
  activeLabel: number = this.staticPages.privacyPolicy;
  constructor(private http: StaticPagesService) { }

  ngOnInit(): void {
    this.getPagesContent();
  }

  getPagesContent(): void {
    this.http.getStaticPages().subscribe(result => {
      result.forEach(page => {
        this.htmlContent[page.type] = page.content;
      });
    });
  }

  save(): void {
    this.http.setStaticPage({ type: this.activeLabel, content: this.htmlContent[this.activeLabel] })
      .subscribe(result => { });
  }
  show(event: MatTabChangeEvent): void {
    this.activeLabel = event.index + 1;
  }
}
