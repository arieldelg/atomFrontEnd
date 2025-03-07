import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AngularMaterialModule } from '../../../core';
import { TaskService } from '../../../tasks/services/task-service.service';
import { Subject } from 'rxjs';
import { ValidatorsService } from '../../../tasks/services/validators.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnDestroy {
  public destroy$ = new Subject<void>();
  public form: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      ValidatorsService.noWhiteSpaceValue,
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      ValidatorsService.noWhiteSpaceValue,
    ]),
    completed: new FormControl(false, Validators.required),
    createdAt: new FormControl(new Date(), Validators.required),
  });

  constructor(
    private readonly modal: ModalService,
    private readonly taskService: TaskService
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleResetForm(cancel: boolean) {
    this.modal.dialogStatus.set(cancel);
  }

  public isValidForm(value: string) {
    return ValidatorsService.isValidForm(value, this.form);
  }

  public onSubmit() {
    const task = this.form;

    if (task.invalid) {
      task.markAllAsTouched();
      return;
    }

    this.taskService.form.set(this.form.value);
    this.taskService.isLoadingTask.set(true);
    this.modal.dialogStatus.set(true);
    this.form.reset();
    this.modal.dialog.getDialogById('newTask')!.close();
  }
}
