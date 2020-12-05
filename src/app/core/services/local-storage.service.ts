import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public writeToLocalStorage(key: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string): any {
    const storage = localStorage.getItem(key);
    return storage;
  }
  public removeKeyFromStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
