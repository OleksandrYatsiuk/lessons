import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle('Practical Legal Courses');
    this.metaService.addTags([
      { name: 'description', content: 'Курс процесуальних документів для студентів юридичного факультету та юристів' },
    ]);
  }

}
