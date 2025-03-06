import { Injectable } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor(private readonly auth: Auth) {}

  get authState$(): Observable<User | null> {
    return authState(this.auth);
  }

  get idToken(): Observable<{
    ok: boolean;
    token: string | null;
    message: string;
  }> {
    return authState(this.auth).pipe(
      mergeMap((user) => {
        return from(user!.getIdToken()).pipe(
          map((token) => ({
            ok: true,
            token,
            message: 'token se encontró con éxito',
          })),
          catchError(() =>
            of({ ok: false, token: null, message: 'Error al buscar token' })
          )
        );
      }),
      catchError(() =>
        of({ ok: false, token: null, message: 'Error en la auth' })
      )
    );
  }

  logOut() {
    return from(signOut(this.auth)).pipe(
      map(() => ({ ok: true, message: 'Logout Success' })),
      catchError((err) => of({ ok: false, message: 'Logout Failed, ' + err }))
    );
  }
}
