import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashStateService {
  private readonly _splashComplete$ = new BehaviorSubject<boolean>(false);
  /** Read-only stream — only SplashScreenComponent can trigger it via complete() */
  readonly splashComplete$: Observable<boolean> = this._splashComplete$.asObservable();

  complete(): void {
    this._splashComplete$.next(true);
  }
}
