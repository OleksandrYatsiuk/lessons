import { Component, Input, OnInit } from '@angular/core';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  @Input() courseId: string;
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'delete'];
  public lessons = [];
  constructor(private http: LessonsDataService ) { }

  ngOnInit(): void {
    this.getList();
  }

  public getList(): void {
    this.http.getLessons({ params: { courseId: this.courseId } }).subscribe(lessons => this.lessons = lessons)
  }
  public delete(id: string) {
    this.http.delete(id).subscribe(result => {
      this.getList();
      console.log(result)
    });
  }
  
}
