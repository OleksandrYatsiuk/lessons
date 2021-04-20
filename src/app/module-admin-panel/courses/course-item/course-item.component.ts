import { Course } from 'src/app/core/interfaces/courses';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/module-shared/guards/dirty-form.guard';
import { Observable } from 'rxjs';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';
import { Meta, Title } from '@angular/platform-browser';
import { CourseDataService } from 'src/app/core/services/course-data.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit, ComponentCanDeactivate {
  public course: Course;
  panelOpenState = false;
  isDirtyForm: boolean;


  constructor(
    private route: ActivatedRoute,
    private _title: Title,
    private _meta: Meta,
    private _cs: ConfirmService,
    private http: CourseDataService,
    private _cd: ChangeDetectorRef
  ) {
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
    this.http.getCourse(this.course.id).subscribe(course => {
      this._title.setTitle(course.name);
      this._meta.updateTag({ name: 'description', content: course.description });
      this._cd.detectChanges();
    });
  }

}
