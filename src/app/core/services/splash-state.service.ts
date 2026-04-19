import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashStateService {
  public splashComplete$ = new BehaviorSubject<boolean>(false);
}
