import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AngularMaterialModule } from '../../../core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './confirmationUser.component.html',
  styles: '',
})
export class ConfirmationComponent {
  public readonly dialogRef = inject(MatDialogRef<ConfirmationComponent>);
  private readonly authService = inject(AuthService);
  constructor(private readonly modal: ModalService) {}

  handleResetForm(value: boolean) {
    if (!value) this.authService.loading.set(false);
    this.modal.modal$.emit({
      confirmation: value,
    });
  }
}
