import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, signal } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  mergeMap,
  takeUntil,
  Subject,
} from 'rxjs';

import { environments } from '../../../environments/environment';
import { NewTask, Task, UpdatedTask } from '../../core/types/task.types';
import { AuthStateService } from '../../shared/services/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  public isLoadingTask = signal<boolean>(false);
  public form = signal<NewTask>({
    title: '',
    description: '',
    completed: false,
    createdAt: new Date(),
  });
  private readonly destroy$ = new Subject<void>();
  constructor(
    private readonly http: HttpClient,
    private readonly authState: AuthStateService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private get tokenVerification() {
    return this.authState.idToken;
  }

  public getUserTasks(): Observable<{
    ok: boolean;
    message: string;
    err: any;
    data: Task[];
  }> {
    return this.tokenVerification.pipe(
      takeUntil(this.destroy$),
      mergeMap(({ token }) => {
        const headers = { Authorization: `Bearer ${token}` };

        return this.http
          .get<Task[]>(`${environments.baseUrlBackend}/tasks`, {
            headers,
          })
          .pipe(
            takeUntil(this.destroy$),
            map((x) => ({
              ok: true,
              data: x,
              message: 'Data fetched',
            })),
            catchError((err) => of(err))
          );
      }),
      catchError((err) =>
        of({ ok: false, message: 'Error getting token', err, data: [] })
      )
    );
  }
  public addTask(): Observable<{
    ok: boolean;
    message: string;
    err?: any;
  }> {
    return this.tokenVerification.pipe(
      mergeMap(({ token }) => {
        const headers = { Authorization: `Bearer ${token}` };
        return this.http
          .post(`${environments.baseUrlBackend}/tasks`, this.form(), {
            headers,
          })
          .pipe(
            map(() => ({
              ok: true,
              message: 'Task Created',
            })),
            catchError((err) =>
              of({ ok: false, message: 'Error creating task', err })
            )
          );
      }),
      catchError((err) =>
        of({ ok: false, message: 'Error getting token', err })
      )
    );
  }

  public updatedTask(
    idTask: string,
    body: UpdatedTask
  ): Observable<{
    ok: boolean;
    message: string;
    err: any;
  }> {
    return this.tokenVerification.pipe(
      mergeMap(({ token }) => {
        const headers = { Authorization: `Bearer ${token}` };
        return this.http
          .put(`${environments.baseUrlBackend}/tasks/${idTask}`, body, {
            headers,
          })
          .pipe(
            map(() => ({
              ok: true,
              message: 'Task Updated',
            })),
            catchError((err) => of(err))
          );
      }),
      catchError((err) =>
        of({ ok: false, message: 'Error getting token', err })
      )
    );
  }

  public deleteTask(idTask: string): Observable<{
    ok: boolean;
    message: string;
    err: any;
  }> {
    return this.tokenVerification.pipe(
      mergeMap(({ token }) => {
        const headers = { Authorization: `Bearer ${token}` };
        return this.http
          .delete<{ ok: boolean; message: string }>(
            `${environments.baseUrlBackend}/tasks/${idTask}`,
            {
              headers,
            }
          )
          .pipe(
            map(({ ok, message }) => ({
              ok,
              message,
            })),
            catchError((err) => of(err))
          );
      }),
      catchError((err) =>
        of({ ok: false, message: 'Error getting token', err })
      )
    );
  }
}
