import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss']
})
export class SpinButtonComponent {
  @Output() clickChange = new EventEmitter<MouseEvent>();
  @Input() loading = false;
  @Input() color = 'primary';
  @Input() disabled = false;
  constructor() { }

}
