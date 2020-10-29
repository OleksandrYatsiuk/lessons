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
  content: string;
  page = EStaticPages;
  constructor(private http: StaticPagesService) { }

  ngOnInit(): void {
    this.getTemplate();
  }

  getTemplate(): void {
    this.http.getStaticPages({ type: this.page.privacyPolicy })
      .subscribe(result => this.content = result[0].content);
  }

}
