import { EStaticPages } from './../../core/interfaces/static-pages';
import { Observable } from 'rxjs';
import { StaticPagesService } from './../../core/services/static-pages.service';
import { Component, OnInit } from '@angular/core';
import { IStaticPages } from 'src/app/core/interfaces/static-pages';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  template$: Observable<IStaticPages>;
  page = EStaticPages;
  constructor(private http: StaticPagesService) { }

  ngOnInit(): void {
    this.template$ = this.getTemplate();
  }
  getTemplate(): Observable<IStaticPages> {
    return this.http.getStaticPages({ type: this.page.privacyPolicy });
  }

}
