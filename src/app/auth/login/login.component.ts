import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

import {
    AngularMaterialModule, AuthServiceService, ModalService, User, ValidatorsService
} from "../../core/index";
import { ConfirmationComponent } from "../../shared";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit, OnDestroy {
    public error: boolean = false;
    public form: FormGroup = new FormGroup({
        email: new FormControl("", [
            Validators.required,
            Validators.pattern(this.validatorService.emailPattern),
        ]),
        password: new FormControl("", Validators.required),
        displayName: new FormControl("", [
            Validators.minLength(4),
            Validators.required,
        ]),
    });
    public view: boolean = false;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly validatorService: ValidatorsService,
        private readonly authService: AuthServiceService,
        private readonly modalService: ModalService,
        private readonly route: Router
    ) {
        this.view = this.checkIfUserSignIn();
    }

    ngOnInit(): void {
        this.modalService.modal$
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp) => {
                if (resp.confirmation) {
                    this.authService.register(this.form.value).subscribe((user) => {
                        if ((user as User).uid) {
                            return this.saveUserToLocaleStorage(user as User);
                        }
                        throw new Error("Error on http register user");
                    });
                }
            });
    }
    ngOnDestroy(): void {
        this.destroy$.complete();
    }

    private checkIfUserSignIn() {
        const user = localStorage.getItem("credentials");
        if (user) {
            this.route.navigate(["tasks"]);
            return false;
        }
        return true;
    }

    public saveUserToLocaleStorage(user: User) {
        localStorage.setItem("credentials", JSON.stringify(user));
        this.form.reset();
        this.route.navigate(["tasks"]);
    }

    public isValidForm(value: string) {
        return (
            this.form.controls[value].errors && this.form.controls[value].touched
        );
    }

    public onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const email = this.form.controls["email"].value;
        this.authService.login(email).subscribe((data) => {
            if ("ok" in data && !data.ok) {
                this.modalService.openDialog({
                    enterAnimationDuration: "0ms",
                    exitAnimationDuration: "0ms",
                    component: ConfirmationComponent
                });
                return;
            }
            this.saveUserToLocaleStorage(data as User);
            this.route.navigate(["tasks"]);
        });
    }
}
