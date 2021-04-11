import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/core/interfaces/courses';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';

@Component({
  selector: 'app-lessons-public-list',
  templateUrl: './lessons-public-list.component.html',
  styleUrls: ['./lessons-public-list.component.scss']
})

export class LessonsPublicListComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isOpened: boolean;
  constructor(private lessonService: LessonsDataService) { }

  ngOnInit(): void {
    this.lessons$ = this._queryLessonList();
  }

  private _queryLessonList(): Observable<Lesson[]> {
    return this.lessonService.getLessons();
  }

}
