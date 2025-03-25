import { Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dnd-e5-ui';

  constructor(private authService: AuthService) {
    this.isLoggedIn = toSignal(this.authService.isSignedIn$);
  }

  public isLoggedIn: Signal<boolean | undefined>;

  public signIn(): void {
    this.authService.signIn();
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
