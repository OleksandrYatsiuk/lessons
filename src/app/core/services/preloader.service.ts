import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  constructor() { }
  private loading$ = new BehaviorSubject<boolean>(null);
  loading = this.loading$.asObservable();

  public start(): void {
    this.loading$.next(true);
  }
  public stop(): void {
    this.loading$.next(false);
  }
}
