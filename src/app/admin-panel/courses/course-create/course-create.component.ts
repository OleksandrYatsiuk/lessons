import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { ComponentCanDeactivate } from 'src/app/shared/guards/dirty-form.guard';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit, ComponentCanDeactivate {

  constructor(private dialog: MatDialog) { }
  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };
  isDirtyForm: boolean;
  isDirty(dirty): void {
    this.isDirtyForm = dirty;
  }
  canDeactivate(): boolean | Observable<boolean> {
    if (this.isDirtyForm) {
      const dialog = this.dialog.open(ConfirmComponent,
        { data: 'Вы дійсно хочете залишити сторінку? Всі не збережені дані будуть видалені!', ...this.config });
      return dialog.afterClosed();
    } else {
      return true;
    }
  }

  ngOnInit(): void {
  }


}
