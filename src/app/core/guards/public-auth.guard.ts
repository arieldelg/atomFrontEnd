import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStateService } from '../../shared/services/auth-state.service';
import { map } from 'rxjs';

export const publicAuthGuard: CanMatchFn = (_route, _segments) => {
  const router = inject(Router);
  const auth = inject(AuthStateService);

  return auth.authState$.pipe(
    map((userState) => {
      if (userState) {
        router.navigateByUrl('tasks');
        return false;
      }
      return true;
    })
  );
};
