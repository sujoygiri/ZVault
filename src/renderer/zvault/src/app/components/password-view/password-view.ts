import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { ItemCardStyleDirective } from '../../directives/item-card-style.directive';
import { Header } from '../header/header';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-password-view',
  imports: [
    CommonModule,
    ItemCardStyleDirective,
    ToggleStateDirective,
    TimeAgoPipe,
    Header,
    EmptyState
  ],
  templateUrl: './password-view.html',
  styleUrl: './password-view.css',
})
export class PasswordView {
  vaultItemPasswords = input<any[]>([]);

  toggleTheme = output<void>();
  addPassword = output<void>();
  sortChange = output<string>();
  openTextView = output<{ id: any; title: string; state: any; }>();
  editPassword = output<{ item: any; state: any; }>();
  deletePassword = output<{ id: any; title: string; }>();

  emitDataAddAction() {
    this.addPassword.emit();
  }

  async fetchDecryptedData(id: string, toggleSate: ToggleStateDirective) {
    if(id && toggleSate && toggleSate.attachedData() === null) {
      const rawResponse = await window.electronAPI?.decryptSensitiveData(id, 'password');
      if(rawResponse){
        const parsedResponse = JSON.parse(rawResponse);
        toggleSate.attachedData.set(parsedResponse); 
      }
    }
  }
}
