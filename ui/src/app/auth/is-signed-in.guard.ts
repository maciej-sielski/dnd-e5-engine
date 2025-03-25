import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const isSignedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isSignedIn$;
};
