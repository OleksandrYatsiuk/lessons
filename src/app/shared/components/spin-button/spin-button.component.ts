import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export type MatBtnTypes = 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 'mat-icon-button' | 'mat-fab' | 'mat-mini-fab'
export enum EMatBtn {
  'mat-button' = 'mat-button',
  'mat-raised-button' = 'mat-raised-button',
  'mat-stroked-button' = 'mat-stroked-button',
  'mat-mini-fab' = 'mat-mini-fab',
  'mat-flat-button' = 'mat-flat-button'
}

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss']
})
export class SpinButtonComponent {
  @Output() clickChange = new EventEmitter<MouseEvent>();
  @Input() loading = false;
  @Input() color: ThemePalette = 'primary';
  @Input() spinColor: ThemePalette = 'primary';
  @Input() matType: EMatBtn = EMatBtn["mat-flat-button"];
  public types = EMatBtn
  constructor() { }

}
