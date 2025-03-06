import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import { UserCred } from '../interfaces/auth.interfaces';
import { environments } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loading = signal<boolean>(false);

  public holdErrorCredentials = signal<string>('');

  public holdUser = signal<UserCred>({
    email: '',
    displayName: '',
    password: '',
  });

  constructor(private readonly http: HttpClient, private readonly auth: Auth) {}

  public signUp(): Observable<{ ok: boolean; resp: UserCredential | string }> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        this.holdUser().email,
        this.holdUser().password
      )
    ).pipe(
      mergeMap((currentUser) =>
        from(
          updateProfile(currentUser.user, {
            displayName: this.holdUser().displayName,
          })
        ).pipe(
          map(() => ({ ok: true, resp: currentUser })),
          catchError((err) => of({ ok: false, resp: err })) // Handle profile update errors
        )
      ),
      catchError((err) => {
        this.loading.set(false);
        return of({ ok: false, resp: err });
      })
    );
  }

  public emailInUse(credentials: UserCred) {
    this.holdUser.set(credentials);
    this.loading.set(true);
    return this.http
      .get<{ ok: boolean; message: string }>(
        `${environments.baseUrlBackend}/user/verifyEmail/${credentials.email}`
      )
      .pipe(catchError(() => of({ ok: false, message: 'user do not exist' })));
  }

  public login() {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        this.holdUser().email,
        this.holdUser().password
      )
    ).pipe(
      mergeMap((currentUser) =>
        from(currentUser.user.getIdToken(true)).pipe(
          mergeMap((token) => {
            const headers = { Authorization: `Bearer ${token}` };
            return this.http
              .get(
                `${environments.baseUrlBackend}/user/${this.holdUser().email}`,
                {
                  headers,
                }
              )
              .pipe(
                map(() => ({ ok: true, message: 'User Login' })),
                catchError((err) =>
                  of({
                    ok: false,
                    message: 'Error fetching user details ' + err,
                  })
                )
              );
          }),
          map(() => ({ ok: true, message: 'User Login' })),
          catchError((err) =>
            of({ ok: false, message: 'Error getting the token ' + err })
          )
        )
      ),
      catchError((errorFirebase) => {
        this.loading.set(false);
        return of({ ok: false, message: 'Invalid Credentials', errorFirebase });
      })
    );
  }
}
