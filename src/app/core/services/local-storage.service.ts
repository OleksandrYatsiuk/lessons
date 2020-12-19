import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  public writeToLocalStorage(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    }
  }

  public getFromLocalStorage(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const storage = localStorage.getItem(key);
      return storage;
    }
  }
  public removeKeyFromStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
}
