import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, pipe, pluck } from 'rxjs';
import { EStaticPages, IStaticPages } from 'src/app/core/interfaces/static-pages';
import { StaticPagesService } from 'src/app/core/services/static-pages.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {

  content: IStaticPages['content'];
  pages$: Observable<IStaticPages[]>;

  constructor(private http: StaticPagesService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pages$ = this._route.params.pipe(mergeMap(({ url }) => this.getTemplate(url)));
  }
  getTemplate(path: string): Observable<IStaticPages[]> {
    return this.http.queryPages({ path }).pipe(pluck('result'));
  }

}
