import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseDataService } from 'src/app/core/services/course-data.service';

@Injectable()
export class CourseOverviewResolver implements Resolve<any> {
    constructor(private http: CourseDataService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.http.getCourse(route.params.id);
    }
}
