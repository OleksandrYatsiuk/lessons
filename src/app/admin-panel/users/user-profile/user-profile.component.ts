import { IStudyProgress } from './../../../core/interfaces/study-progress';
import { Observable } from 'rxjs';
import { User } from './../users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course, Lesson } from 'src/app/core/interfaces/courses';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user: User;
  public userProgress = 0;


  step = 0;
  selectedCourse: string;
  studyProgressList$: Observable<IStudyProgress[]>;
  coursesList$: Observable<Course[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    this.user = this.route.snapshot.data.user;
  }


  ngOnInit(): void {

  }

  openChat(lesson: Lesson): void {
    this.router.navigate(['/admin/messages', { userId: this.user.id, lessonId: lesson._id }]);

  }



}
