import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
public course;
  constructor(private route:ActivatedRoute) { 
    this.course = this.route.snapshot.data.course
  }

  ngOnInit(): void {
  }

}
