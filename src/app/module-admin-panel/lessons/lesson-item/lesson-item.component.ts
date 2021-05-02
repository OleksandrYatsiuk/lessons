import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/core/interfaces/courses';
import { ConfirmService } from 'src/app/core/services/confirm/confirm.service';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss']
})
export class LessonItemComponent implements OnInit {
  lesson: Lesson;
  context: SafeHtml;
  text = '';
  isDirtyForm: boolean;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _cs: ConfirmService) {
  }

  ngOnInit(): void {
    this.lesson = this.route.snapshot.data.lesson;
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

}
