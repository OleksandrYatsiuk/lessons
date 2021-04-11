import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from '../core/services/local-storage.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Головна', icon: 'pi pi-fw pi-bars', replaceUrl: false, routerLink: '/' },
      { label: 'Користувачі', icon: 'pi pi-fw pi-users', replaceUrl: false, routerLink: 'users' },
      { label: 'Чат', icon: 'pi pi-fw pi-comments', routerLink: 'messages' },
      { label: 'Курси', icon: 'pi pi-fw pi-calendar-times', routerLink: 'courses' },
      { label: 'Заняття', icon: 'pi pi-fw pi-file', routerLink: 'lessons' },
      { label: 'Статичні сторінки', icon: 'pi pi-fw pi-info-circle', routerLink: 'pages' },
      { label: 'Сертифікати', icon: 'pi pi-fw pi-check-circle', routerLink: 'certificates' }
    ];

    this.activeItem = this.items.find(route => route.url === this.route.url);

  }

}
