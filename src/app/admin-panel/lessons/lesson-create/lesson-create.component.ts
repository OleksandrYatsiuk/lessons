import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';
import { ComponentCanDeactivate } from 'src/app/shared/guards/dirty-form.guard';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.scss']
})
export class LessonCreateComponent implements OnInit, ComponentCanDeactivate {

  constructor(private dialog: MatDialog) { }

  isDirtyForm: boolean;

  isDirty(dirty: boolean): void {
    this.isDirtyForm = dirty;
  }
  canDeactivate(): boolean | Observable<boolean> {
    if (this.isDirtyForm) {
      const dialog = this.dialog.open(ConfirmComponent,
        { data: 'Вы дійсно хочете залишити сторінку? Всі не збережені дані будуть видалені!' });
      return dialog.afterClosed();
    } else {
      return true;
    }
  }
  ngOnInit(): void {
  }

}
