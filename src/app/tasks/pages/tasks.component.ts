import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { AngularMaterialModule, Task } from '../../core';
import { TaskSectionComponent } from '../components/task-section/task-section.component';
import { HeaderComponent } from '../components/header/header.component';
import { AuthStateService } from '../../shared/services/auth-state.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth/services/auth-service.service';
import { TaskService } from '../services/task-service.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AngularMaterialModule,
    HeaderComponent,
    TaskSectionComponent,
    CommonModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit, OnDestroy {
  public user = signal<string>('');
  public task = signal<Task[]>([]);
  public destroy$ = new Subject<void>();

  constructor(
    private readonly authState: AuthStateService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.authService.loading.set(false);
    this.authService.holdErrorCredentials.set('');
    this.authState.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        return this.user.set(resp?.displayName!);
      });
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get loading() {
    return this.taskService.isLoadingTask();
  }

  public triggerTask() {
    this.getTasks(false);
  }

  private getTasks(loading?: boolean) {
    return this.taskService
      .getUserTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        if (resp.ok) this.task.set(resp.data);
        this.taskService.isLoadingTask.set(loading ?? false);
      });
  }

  public logout() {
    this.authState.logOut().subscribe(({ ok, message }) => {
      if (!ok) throw new Error(message);

      this.router.navigate(['auth']);
    });
  }
}
