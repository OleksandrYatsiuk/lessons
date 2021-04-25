import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  path: string;
  languages: SelectItem[] = [
    { label: 'UK', value: 'uk' },
    { label: 'EN', value: 'en' },
    // { label: 'RU', value: 'ru', disabled: true }
  ];
  items: any[];
  display: boolean;
  menus: { label: string; routerLink: string; items?: any[] }[];
  constructor(
    private _ts: TranslateService,
    private _route: Router,
    private _cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._route.events.subscribe(params => {
      if (params instanceof NavigationEnd) {
        this.path = params.url;
        this.display = false;
        this._cd.detectChanges();
      }
    });
    this.menus = [
      { label: 'pageTitles.lessonsList', routerLink: '/homework/lessons' },
      { label: 'pageTitles.coursePayment', routerLink: '/payment' },
      { label: 'pageTitles.enrollCourse', routerLink: '/start' },
      { label: 'pageTitles.adminPanel', routerLink: '/admin' }
    ];

    this.items = [
      { label: 'pageTitles.users', routerLink: '/admin/users' },
      { label: 'pageTitles.chat', routerLink: '/admin/messages' },
      { label: 'pageTitles.courses', routerLink: '/admin/courses' },
      { label: 'pageTitles.lessons', routerLink: '/admin/lessons' },
      { label: 'pageTitles.staticPages', routerLink: '/admin/pages' },
      { label: 'pageTitles.certificates', routerLink: '/admin/certificates' }
    ];
  }

  openMenu(): void {
    this.display = !this.display;
  }

  onChangeLang({ value }: { value: string }): void {
    this._ts.use(value);
  }

  isAdminPanel(): boolean {
    if (this.path?.includes('/admin')) {
      return true;
    }
    return false;
  }


}
