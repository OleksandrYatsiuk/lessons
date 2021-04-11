import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private loading$ = new BehaviorSubject<boolean>(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  loading = this.loading$.asObservable();

  constructor() { }

  public start(): void {
    this.loading$.next(true);
  }
  public stop(): void {
    this.loading$.next(false);
  }
}
