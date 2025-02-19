import { EventEmitter, inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { OptionsDialog } from "../types/modal.types";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    public readonly dialog = inject(MatDialog);
    public modal$: EventEmitter<{ confirmation: boolean }> = new EventEmitter();

    public openDialog({
        enterAnimationDuration,
        exitAnimationDuration,
        component,
        disableClose = false,
        payload,
        id
    }: OptionsDialog): Observable<any> {
        const dialogRef = this.dialog.open(component, {
            data: payload ?? null,
            disableClose,
            width: "auto",
            enterAnimationDuration,
            exitAnimationDuration,
            id
        });

        return dialogRef.afterClosed();
    }
}
