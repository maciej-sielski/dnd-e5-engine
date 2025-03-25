import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public isSignedIn$: Observable<boolean>;

  constructor() {
    this.isSignedIn$ = this.isLoggedInSubject.asObservable();
  }

  public signIn(): void {
    this.isLoggedInSubject.next(true);
  }

  public signOut(): void {
    this.isLoggedInSubject.next(false);
  }
}
