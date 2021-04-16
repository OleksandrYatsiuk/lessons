import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {

  @Input() userId: string;
  @Input() courseId: string;
  file: File;
  control = new FormControl('', [Validators.required]);
  constructor(
    private _ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
  }
  onFileChange(changes: Event & { target: HTMLInputElement }): void {
    this.file = changes.target.files[0];
  }
  upload(): void {
    this._ref.close(this.file);
  }
}
