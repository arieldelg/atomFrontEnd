import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import {
    AngularMaterialModule, EventEmitterUpdated, LocalStorageService, ModalService, Task, TaskService
} from "../../../core";
import { NewTaskComponent } from "../../modals/new-task/new-task.component";
import { TaskCardsComponent } from "../task-cards/task-cards.component";

@Component({
    selector: "app-task-section",
    standalone: true,
    imports: [
        CommonModule,
        AngularMaterialModule,
        TaskCardsComponent
    ],
    templateUrl: "./task-section.component.html",
    styleUrl: "./task-section.component.scss"
})
export class TaskSectionComponent implements OnInit {
    public taskList: Task[] = [];
    public taskLength: number = 0;
    constructor(
        private readonly modal: ModalService,
        private readonly taskService: TaskService,
        private readonly localStorage: LocalStorageService
    ) {

    }
    ngOnInit(): void {
        this.getTasks();
    }

    private getTasks(): Subscription {
        return this.taskService.getUserTasks(this.localStorage.getUserLocalStorage()).subscribe((resp) => {
            this.taskLength = resp.length;
            this.taskList = resp;
        });
    }

    public openModal() {
        this.modal.openDialog({
            enterAnimationDuration: "0",
            exitAnimationDuration: "0",
            component: NewTaskComponent,
            disableClose: true,
            id: "newTask"
        }).subscribe(() => {
            this.getTasks();
        });
    }

    public updateTask(payload: EventEmitterUpdated) {
        const { completed, id, pending } = payload;
        this.taskService.updatedTask(id, { completed, pending }).subscribe((resp) => {
            if (!resp.ok) throw new Error("Error updating Task");
            this.getTasks();
        });
    }

    public deleteTask(id: string) {
        this.taskService.deleteTask(id).subscribe((resp) => {
            if (!resp.ok) throw new Error("Error deleting task");
            this.getTasks();
        });
    }
}
