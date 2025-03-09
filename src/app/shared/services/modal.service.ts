import { EventEmitter, inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { OptionsDialog } from '../../core/types/modal.types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public readonly dialog = inject(MatDialog);
  public dialogStatus = signal<boolean>(false);
  public modal$: EventEmitter<{ confirmation: boolean }> = new EventEmitter();

  public openDialog({
    enterAnimationDuration,
    exitAnimationDuration,
    component,
    disableClose = false,
    payload,
    id,
    maxWidth,
    width,
  }: OptionsDialog): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      data: payload ?? null,
      disableClose,
      width: width ?? 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      id,
      maxWidth,
    });

    return dialogRef.afterClosed();
  }
}
