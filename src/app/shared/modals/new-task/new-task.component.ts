import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormControl, FormGroup, ReactiveFormsModule, Validators
} from "@angular/forms";

import { AngularMaterialModule } from "../../../core";
import { ModalService } from "../../../core/services/modal.service";
import { TaskService } from "../../../core/services/task-service.service";
import { ValidatorsService } from "../../../core/services/validators.service";

@Component({
    selector: "app-new-task",
    standalone: true,
    imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
    templateUrl: "./new-task.component.html",
    styleUrl: "./new-task.component.scss"
})
export class NewTaskComponent {
    public form: FormGroup = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        completed: new FormControl(false, Validators.required),
        createdAt: new FormControl(new Date(), Validators.required),
    });

    constructor(
        private readonly modal: ModalService,
        private readonly taskService: TaskService
    ) {}

    public isValidForm(value: string) {
        return ValidatorsService.isValidForm(value, this.form);
    }

    public onSubmit() {
        const task = this.form;
        if (task.invalid) {
            task.markAllAsTouched();
            return;
        }
        this.taskService.addTask(task.value).subscribe(
            (resp) => {
                if (!resp.uid) throw new Error("Something went wrong");
                task.reset();
                this.modal.dialog.getDialogById("newTask")?.close();
            }
        );
    }
}
