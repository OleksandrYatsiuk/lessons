import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EStaticPages, IStaticPages } from 'src/app/core/interfaces/static-pages';
import { StaticPagesService } from 'src/app/core/services/static-pages.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  page = EStaticPages;
  template$: Observable<IStaticPages>;
  constructor(private http: StaticPagesService) { }

  ngOnInit(): void {
    this.template$ = this.getTemplate();
  }
  getTemplate(): Observable<IStaticPages> {
    return this.http.getStaticPages({ type: this.page.termsAndConditions });
  }


}
