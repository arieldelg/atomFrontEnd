import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormControl, FormGroup, ReactiveFormsModule, Validators
} from "@angular/forms";

import { AngularMaterialModule } from "../angular-material/angular-material.module";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    public form: FormGroup = new FormGroup({
        email: new FormControl("", Validators.email)
    });

    onSubmit() {
        console.log(this.form.value);
    }
}
