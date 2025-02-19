import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AngularMaterialModule, User } from "../core";
import { HeaderComponent, TaskSectionComponent } from "../shared";

@Component({
    selector: "app-tasks",
    standalone: true,
    imports: [
        AngularMaterialModule,
        HeaderComponent,
        TaskSectionComponent,
        CommonModule
    ],
    templateUrl: "./tasks.component.html",
    styleUrl: "./tasks.component.scss"
})
export class TasksComponent implements OnInit {
    private readonly credentials: string | null = localStorage.getItem("credentials");
    public user: User | undefined;
    public view: boolean = false;
    constructor(
        private readonly route: Router
    ) {
        this.view = this.checkIfUserIsValid();
    }

    ngOnInit(): void {
        this.getUser();
    }

    private checkIfUserIsValid() {
        if (!this.credentials) {
            this.route.navigate(["home"]);
            return false;
        }
        return true;
    }

    private getUser() {
        this.user = JSON.parse(this.credentials!);
    }
}
