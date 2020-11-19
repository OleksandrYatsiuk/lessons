import { Course } from 'src/app/core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/shared/guards/dirty-form.guard';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, ComponentCanDeactivate {
  public course: Course;
  panelOpenState = false;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.course = this.route.snapshot.data.course;
  }

  private config: MatDialogConfig = {
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true
  };
  isDirtyForm: boolean;
  isDirty(dirty: boolean): void {
    this.isDirtyForm = dirty;
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.isDirtyForm) {
      const dialog = this.dialog.open(ConfirmComponent,
        { data: 'Вы дійсно хочете залишити сторінку? Всі не збережені дані бужуть видалені!', ...this.config });
      return dialog.afterClosed();
    } else {
      return true;
    }
  }

  ngOnInit(): void {
  }

}
