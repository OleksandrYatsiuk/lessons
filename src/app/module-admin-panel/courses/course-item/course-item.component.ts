import { Course } from 'src/app/core/interfaces/courses';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/module-shared/guards/dirty-form.guard';
import { Observable } from 'rxjs';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit, ComponentCanDeactivate {
  public course: Course;
  panelOpenState = false;
  isDirtyForm: boolean;

  constructor(private route: ActivatedRoute,
    private _cs: ConfirmService) {
    this.course = this.route.snapshot.data.course;
  }


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
