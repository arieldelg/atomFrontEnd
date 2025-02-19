import { CommonModule, DatePipe, TitleCasePipe } from "@angular/common";
import {
    Component, EventEmitter, Input, Output
} from "@angular/core";

import { AngularMaterialModule, EventEmitterUpdated, Task } from "../../../core";

@Component({
    selector: "app-task-cards",
    standalone: true,
    imports: [
        CommonModule,
        DatePipe,
        TitleCasePipe,
        AngularMaterialModule
    ],
    templateUrl: "./task-cards.component.html",
    styleUrl: "./task-cards.component.scss"
})
export class TaskCardsComponent {
    @Input()
    public task!: Task;

    @Output()
    public updateTaskEvent: EventEmitter<EventEmitterUpdated> = new EventEmitter();

    @Output()
    public deleteTaskEvent: EventEmitter<string> = new EventEmitter();

    public updateTask(type: string) {
        this.updateTaskEvent.emit({
            id: this.task.id!,
            completed: type === "completed",
            pending: type === "pending"
        });
    }

    public deleteTask(idTask: string) {
        this.deleteTaskEvent.emit(idTask);
    }
}
