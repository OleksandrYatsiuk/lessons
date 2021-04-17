import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MetaDataService } from 'spm-core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private _md: MetaDataService
  ) { }

  ngOnInit(): void {
    this._md.updateMeta({
      title: 'PLC Title Example',
      description: 'This is PLC description example'
    });
  }

}
