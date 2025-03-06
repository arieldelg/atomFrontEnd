import { CommonModule } from '@angular/common';
import { Component, computed, input, OnDestroy, output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import {
  AngularMaterialModule,
  EventEmitterUpdated,
  ModalService,
  Task,
} from '../../../core';
import { NewTaskComponent } from '../../../shared';
import { TaskCardsComponent } from '../task-cards/task-cards.component';
import { TaskService } from '../../services/task-service.service';
import { TaskLoaderComponent } from '../../../shared/components/task-loader/task-loader.component';

@Component({
  selector: 'app-task-section',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    TaskCardsComponent,
    TaskLoaderComponent,
  ],
  templateUrl: './task-section.component.html',
  styleUrl: './task-section.component.scss',
})
export class TaskSectionComponent implements OnDestroy {
  public taskList = input.required<Task[] | []>();
  public taskLength = computed(() => this.taskList().length);
  public trigger = output();
  public destroy$ = new Subject<void>();
  constructor(
    private readonly modal: ModalService,
    private readonly taskService: TaskService
  ) {}

  get loading() {
    return this.taskService.isLoadingTask();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openModal() {
    this.modal
      .openDialog({
        enterAnimationDuration: '0',
        exitAnimationDuration: '0',
        component: NewTaskComponent,
        disableClose: true,
        id: 'newTask',
      })
      .subscribe(() => {
        if (!this.modal.dialogStatus()) return;
        this.taskService
          .addTask()
          .pipe(takeUntil(this.destroy$))
          .subscribe(({ ok, message }) => {
            if (!ok) throw new Error(message);

            this.trigger.emit();
          });
      });
  }

  public updateTask(payload: EventEmitterUpdated) {
    const { completed, id } = payload;
    this.taskService
      .updatedTask(id, { completed })
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        if (!resp.ok) throw new Error('Error updating Task');
        this.trigger.emit();
      });
  }

  public deleteTask(id: string) {
    this.taskService.isLoadingTask.set(true);
    this.taskService
      .deleteTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        if (!resp.ok) throw new Error('Error deleting task');
        this.trigger.emit();
      });
  }
}
