import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';

import {
  AngularMaterialModule,
  EventEmitterUpdated,
  Task,
} from '../../../core';
import { debounceTime, Observable, take } from 'rxjs';

@Component({
  selector: 'app-task-cards',
  standalone: true,
  imports: [CommonModule, DatePipe, TitleCasePipe, AngularMaterialModule],
  templateUrl: './task-cards.component.html',
  styleUrl: './task-cards.component.scss',
})
export class TaskCardsComponent {
  public task = input.required<Task>();
  public loading = signal<boolean>(false);
  public ob = new Observable((subs) => {
    subs.next(true);
  });
  @Output()
  public updateTaskEvent: EventEmitter<EventEmitterUpdated> =
    new EventEmitter();

  @Output()
  public deleteTaskEvent: EventEmitter<string> = new EventEmitter();

  public updateTask() {
    if (this.loading()) return;
    this.loading.set(true);
    this.ob.pipe(debounceTime(50), take(1)).subscribe(() => {
      console.log(this.task().id);
      this.updateTaskEvent.emit({
        id: this.task().id!,
        completed: !this.task().completed,
      });
      this.task().completed = !this.task().completed;
      this.loading.set(false);
    });
  }

  public deleteTask(idTask: string) {
    this.deleteTaskEvent.emit(idTask);
  }
}
