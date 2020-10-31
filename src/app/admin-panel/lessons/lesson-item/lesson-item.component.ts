import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/core/interfaces/courses';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss']
})
export class LessonItemComponent implements OnInit {
  lesson: Lesson;
  constructor(private route: ActivatedRoute) {
    this.lesson = this.route.snapshot.data.lesson;
  }

  ngOnInit(): void {
  }

}
