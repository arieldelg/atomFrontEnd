import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "app-example-page",
    standalone: true,
    imports: [
        MatButton,
        NgOptimizedImage,
        ReactiveFormsModule
    ],
    templateUrl: "./example-page.component.html",
    styleUrl: "./example-page.component.scss"
})
export class ExamplePageComponent {
    public form = new FormGroup({
        email: new FormControl("")
    });
}
