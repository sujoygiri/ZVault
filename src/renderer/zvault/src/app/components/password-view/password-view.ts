import { CommonModule } from '@angular/common';
import { Component, model, output } from '@angular/core';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { ItemCardStyleDirective } from '../../directives/item-card-style.directive';
import { Header } from '../header/header';
import { EmptyState } from '../empty-state/empty-state';
import { DataType, PasswordDetails, TotalPasswordData } from '@zvault/shared-api';

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
  vaultItemPasswords = model<PasswordDetails[]>([]);

  toggleTheme = output<void>();
  addPassword = output<void>();
  sortChange = output<string>();
  openNoteView = output<{ title: string, content: string; }>();
  editPassword = output<{item: TotalPasswordData, type: DataType}>();
  deletePassword = output<{ id: string; title: string; type: DataType }>();

  async triggerNoteView(id: string, noteTitle: string, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(id, toggleState);
    let note = toggleState.attachedData().note;
    let content = note !== '' ? note : 'No note is available';
    this.openNoteView.emit({ title: noteTitle, content });
  }

  async fetchDecryptedData(id: string, toggleSate: ToggleStateDirective) {
    if (id && toggleSate && toggleSate.attachedData() === null) {
      const rawResponse = await window.electronAPI?.decryptSensitiveData(id, 'password');
      if (rawResponse) {
        const parsedResponse = JSON.parse(rawResponse);
        toggleSate.attachedData.set(parsedResponse);
      }
    }
  }

  async handlePasswordEdit(item: PasswordDetails, toggleSate: ToggleStateDirective) {
    await this.fetchDecryptedData(item.id, toggleSate);
    const totalPasswordData: TotalPasswordData = {
      ...item,
      usernameOrEmail: toggleSate.attachedData().usernameOrEmail,
      password: toggleSate.attachedData().password,
      note: toggleSate.attachedData().note
    };
    this.editPassword.emit({item: totalPasswordData, type: 'password'});
  }
}
