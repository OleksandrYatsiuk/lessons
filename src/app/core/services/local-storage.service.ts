import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public writeToLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getFromLocalStorage(key: string): any {
    const storage = localStorage.getItem(key);
    return storage;
  }
  public removeKeyFromStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
