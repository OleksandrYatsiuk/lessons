import { Lesson } from '../../core/interfaces/courses';
import { LessonsDataService } from 'src/app/core/services/lessons-data.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LessonOverviewResolver implements Resolve<any> {
    constructor(private http: LessonsDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson> {
        return this.http.getLesson(route.params.id);
    }
}
