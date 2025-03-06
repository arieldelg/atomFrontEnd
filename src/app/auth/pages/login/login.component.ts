import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import {
  AngularMaterialModule,
  ModalService,
  ValidatorsService,
} from '../../../core/index';
import { ConfirmationComponent } from '../../../shared';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public error: boolean = false;
  public message = signal<string>('');
  public credentialError = signal<string>('');
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.validatorService.emailPattern),
    ]),
    password: new FormControl('', Validators.required),
    displayName: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
  });
  constructor(
    private readonly validatorService: ValidatorsService,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly route: Router
  ) {}
  ngOnInit(): void {
    this.message.set(this.authService.holdErrorCredentials());
  }

  public isValidForm(value: string) {
    return (
      this.form.controls[value].errors && this.form.controls[value].touched
    );
  }

  public onSubmit() {
    this.credentialError.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.emailInUse(this.form.value).subscribe(({ ok }) => {
      if (ok) {
        this.authService.login().subscribe(({ message }) => {
          if (message === 'Invalid Credentials') {
            this.authService.holdErrorCredentials.set('Invalid Credentials');
          } else {
            this.authService.holdErrorCredentials.set('');
            this.route.navigate(['tasks']);
          }
        });
        return;
      }
      this.modalService.openDialog({
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
        component: ConfirmationComponent,
      });
    });
  }
}
