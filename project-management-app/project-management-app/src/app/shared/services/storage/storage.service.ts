import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveInStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}

