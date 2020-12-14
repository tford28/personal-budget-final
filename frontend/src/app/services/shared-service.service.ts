import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  sharedSubject: BehaviorSubject<string> = new BehaviorSubject<string>('guest');
  constructor() {}
}
