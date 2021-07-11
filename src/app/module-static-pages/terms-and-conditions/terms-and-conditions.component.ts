import { Component, OnInit } from '@angular/core';
import { EStaticPages, IStaticPages } from 'src/app/core/interfaces/static-pages';
import { StaticPagesService } from 'src/app/core/services/static-pages.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  page = EStaticPages;
  content: IStaticPages['content'];
  constructor(private http: StaticPagesService) { }

  ngOnInit(): void {
    this.getTemplate();
  }
  getTemplate(): void {
    this.http.queryPages({ type: this.page.termsAndConditions })
      .subscribe(result => this.content = result[0].content);
  }

}
