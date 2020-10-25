import { CustomMessage, EFileTypes, FileOptions } from './../message.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() item: CustomMessage;
  types = EFileTypes;
  constructor() { }

  ngOnInit(): void {
    console.log(this.item);
  }

}
