import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: SelectItem[] = [
    { label: 'UK', value: 'uk' },
    { label: 'EN', value: 'en' },
    { label: 'RU', value: 'ru', disabled: true }
  ]
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {

  }

  onChangeLang({ value }: { value: string }): void {
    this.translate.use(value);
  }

}
