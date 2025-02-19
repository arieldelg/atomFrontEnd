import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { AngularMaterialModule } from "../../../core";
import { ModalService } from "../../../core/services/modal.service";

@Component({
    selector: "app-confirmation",
    standalone: true,
    imports: [CommonModule, AngularMaterialModule],
    templateUrl: "./confirmationUser.component.html",
    styles: "",
})
export class ConfirmationComponent {
    public readonly dialogRef = inject(MatDialogRef<ConfirmationComponent>);
    constructor(private readonly modal: ModalService) {}
    handleResetForm(value: boolean) {
        this.modal.modal$.emit({
            confirmation: value,
        });
    }
}
