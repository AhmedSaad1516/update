import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private currentPage: string;
  private dataSubject = new BehaviorSubject<string>('');

  constructor() {
    this.currentPage = '';
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  getCurrentPage(): string {
    return this.currentPage;
  }


  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
}