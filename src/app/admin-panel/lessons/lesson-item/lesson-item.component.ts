import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/core/interfaces/courses';
import { ConfirmComponent } from 'src/app/shared/components/dialogs/confirm/confirm.component';

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
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private dialog: MatDialog) {
    this.lesson = this.route.snapshot.data.lesson;
  }

  ngOnInit(): void {
    const link = this.lesson.context.split(new RegExp('<div class="custom-video">(.*?)</div>'))[1];
    this.text = `<div class="custom-video"><iframe width="100%" height="100%" src="${link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    this.context = this.sanitizer.bypassSecurityTrustHtml(
      this.lesson.context.replace(new RegExp('<div class="custom-video">(.*?)</div>'), this.text));
  }


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

}
