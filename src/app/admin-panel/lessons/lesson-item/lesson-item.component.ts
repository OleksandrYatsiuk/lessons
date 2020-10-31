import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/core/interfaces/courses';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss']
})
export class LessonItemComponent implements OnInit {
  lesson: Lesson;
  context: any
  text = '';
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.lesson = this.route.snapshot.data.lesson;
  }

  ngOnInit(): void {
    let link = this.lesson.context.split(new RegExp('<div class="custom-video">(.*?)</div>'))[1];
    this.text = `<div class="custom-video"><iframe width="100%" height="100%" src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    this.context = this.sanitizer.bypassSecurityTrustHtml(this.lesson.context.replace(new RegExp('<div class="custom-video">(.*?)</div>'), this.text));

  }

}
