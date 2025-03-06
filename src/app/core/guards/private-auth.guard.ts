import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStateService } from '../../shared/services/auth-state.service';
import { map } from 'rxjs';

export const privateAuthGuard: CanMatchFn = (_route, _segments) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  return authState.authState$.pipe(
    map((stateUser) => {
      if (!stateUser) {
        router.navigate(['auth/login']);
        return false;
      }
      return true;
    })
  );
};
