import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { AngularMaterialModule } from "../../../core";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        CommonModule,
        TitleCasePipe,
        AngularMaterialModule
    ],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent {
    @Input()
    public userName?: string;

    constructor(
        private readonly router: Router
    ) {}

    public logOutUser() {
        localStorage.removeItem("credentials");

        this.router.navigate(["home"]);
    }
}
