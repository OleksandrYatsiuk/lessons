import { Lesson } from './../../../core/interfaces/courses';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/core/interfaces/courses';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { DeleteComponent } from 'src/app/shared/components/dialogs/delete/delete.component';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  @Input() courseId: string;
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];
  public lessons = [];
  constructor(private http: LessonsDataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList(): void {
    this.http.getLessons({ params: { courseId: this.courseId } }).subscribe(lessons => this.lessons = lessons)
  }
  public delete(lesson: Lesson) {
    this.http.delete(lesson.id).subscribe(result => {
      this.getList();
      console.log(result)
    });
  }

  private config: MatDialogConfig = {
    position: {
      top: '20px'
    },
    autoFocus: false,
    disableClose: true,
    hasBackdrop: true,
  }

  openDialog(lesson: Lesson): void {
    const dialogRef = this.dialog.open(DeleteComponent, { data: `урок "${lesson.name}"`, ...this.config });
    dialogRef.beforeClosed()
      .subscribe(result => {
        if (result) {
          this.delete(lesson);
        }
      })
  }


}
