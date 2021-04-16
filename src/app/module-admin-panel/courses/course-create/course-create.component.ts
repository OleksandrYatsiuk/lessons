import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { ComponentCanDeactivate } from 'src/app/module-shared/guards/dirty-form.guard';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit, ComponentCanDeactivate {
  isDirtyForm: boolean;
  constructor(private _cs: ConfirmService) { }

  isDirty(dirty: boolean): void {
    this.isDirtyForm = dirty;
  }
  canDeactivate(): boolean | Observable<boolean> {
    if (this.isDirtyForm) {
      return this._cs.confirm();
    }
    return true;
  }

  ngOnInit(): void {
  }


}
