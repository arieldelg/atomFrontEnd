import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AuthService } from '../../services/auth-service.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly modalService = inject(ModalService);
  private readonly route = inject(Router);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.modalService.modal$
      .pipe(
        takeUntil(this.destroy$),
        filter((resp) => resp.confirmation),
        switchMap(() => this.authService.signUp())
      )
      .subscribe({
        next: ({ ok, resp }) => {
          if (!ok) throw new Error(resp as string);

          this.route.navigate(['tasks']);
        },
        error: (err) => console.error('Error:', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.authService.loading.set(false);
  }

  get loading() {
    return this.authService.loading;
  }
}
