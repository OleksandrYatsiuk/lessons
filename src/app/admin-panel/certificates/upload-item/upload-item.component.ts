import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<UploadItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  onFileChange(changes: Event & { target: HTMLInputElement }): void {
    this.file = changes.target.files[0];
  }
  upload(): void {
    this.dialogRef.close(this.file);
  }
}
