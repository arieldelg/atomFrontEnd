import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { AngularMaterialModule } from '../../../core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, AngularMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input()
  public userName?: string;

  public logOut = output<boolean>();

  public logOutUser() {
    this.logOut.emit(true);
  }
}
