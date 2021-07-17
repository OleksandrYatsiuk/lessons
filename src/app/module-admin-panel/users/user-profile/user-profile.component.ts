import { IStudyProgress } from '../../../core/interfaces/study-progress';
import { Observable } from 'rxjs';
import { User } from '../users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Course, Lesson } from 'src/app/core/interfaces/courses';
import { UserDataService } from 'src/app/core/services/user-data.service';



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
    private router: Router,
    private userService: UserDataService) {
  }


  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;

  }
  updateStatus(haveMessages: boolean): void {
    this.userService.update({ ...this.user, ...{ haveMessages } })
      .subscribe(res => { });
  }

  openChat(lesson: Lesson): void {
    this.router.navigate(['/admin/messages', { userId: this.user.id, lessonId: lesson._id }]);

  }



}
