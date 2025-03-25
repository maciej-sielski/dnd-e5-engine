import { Component, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AuthService } from './auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule],
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
