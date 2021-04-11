import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ERROR_LIST } from './error-messages-list';

@Component({
  selector: 'app-error-validation',
  templateUrl: './error-validation.component.html',
  styleUrls: ['./error-validation.component.scss']
})
export class ErrorValidationComponent {

  @Input() field: string;
  @Input() secondField: string;
  @Input() control: AbstractControl;
  @Input() update: EventEmitter<boolean>;
  list = ERROR_LIST;
  constructor() {
  }

}

