import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { ItemCardStyleDirective } from '../../directives/item-card-style.directive';
import { Header } from '../header/header';

@Component({
  selector: 'app-password-view',
  imports: [
    CommonModule,
    ItemCardStyleDirective,
    ToggleStateDirective,
    TimeAgoPipe,
    Header
  ],
  templateUrl: './password-view.html',
  styleUrl: './password-view.css',
})
export class PasswordView {
  vaultItemPasswords = input<any[]>([]);
  isDarkMode = input<boolean>(false);

  toggleTheme = output<void>();
  addPassword = output<void>();
  sortChange = output<string>();
  openTextView = output<{ id: any; title: string; state: any; }>();
  editPassword = output<{ item: any; state: any; }>();
  deletePassword = output<{ id: any; title: string; }>();
  fetchDecryptedData = output<{ id: any; state: any; }>();
}
