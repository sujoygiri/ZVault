import { CommonModule } from '@angular/common';
import { Component, model, output, QueryList, ViewChildren } from '@angular/core';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { ItemCardStyleDirective } from '../../directives/item-card-style.directive';
import { Header } from '../header/header';
import { EmptyState } from '../empty-state/empty-state';
import { DataType, PasswordDetails } from '@zvault/shared-api';
import { ToastService } from '../../services/toast.service';
import { SettingsService } from '../../services/settings.service';

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

  @ViewChildren(ToggleStateDirective) toggleStateDirective!: QueryList<ToggleStateDirective>;

  vaultItemPasswords = model<PasswordDetails[]>([]);
  addPassword = output<void>();
  openNoteView = output<{ title: string, content: string; }>();
  editPassword = output<{item: PasswordDetails, type: DataType}>();
  deletePassword = output<{ id: string; title: string; type: DataType }>();

  constructor(
    private toastService: ToastService,
    protected settingsService: SettingsService,
  ) {}

  async triggerNoteView(id: string, noteTitle: string, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(id, toggleState);
    let note = toggleState.attachedData().note;
    let content = note !== '' ? note : 'No note is available';
    this.openNoteView.emit({ title: noteTitle, content });
  }

  async fetchDecryptedData(id: string, toggleState: ToggleStateDirective) {
    if (id && toggleState && toggleState.attachedData() === null) {
      const rawResponse = await window.electronAPI?.decryptSensitiveData(id, 'password');
      if (rawResponse) {
        const parsedResponse = JSON.parse(rawResponse);
        toggleState.attachedData.set(parsedResponse);
      }
    }
  }

  async handlePasswordEdit(item: PasswordDetails, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(item.id, toggleState);
    const totalPasswordData: PasswordDetails = {
      ...item,
      usernameOrEmail: toggleState.attachedData().usernameOrEmail,
      password: toggleState.attachedData().password,
      note: toggleState.attachedData().note
    };
    this.editPassword.emit({item: totalPasswordData, type: 'password'});
    toggleState.reset();
    // this.toggleStateDirective.forEach((stateDirective) => {
    //   stateDirective.reset();
    // })
  }

  async handleUrlOpen(url: string) {
    window.electronAPI?.openUrl(url);
  }

  async copyData(type: 'usernameOrEmail' | 'password', id: string, toggleState: ToggleStateDirective) {
    await this.fetchDecryptedData(id, toggleState);
    let copyResponse;
    if(type === 'usernameOrEmail') {
      copyResponse = await window.electronAPI?.copyToClipBoard(toggleState.attachedData().usernameOrEmail);
    } else {
      copyResponse = await window.electronAPI?.copyToClipBoard(toggleState.attachedData().password);
    }
    if(copyResponse?.success) {
      this.toastService.info("Copy", copyResponse.message, 2000);
    } else {
      this.toastService.error("Copy", "Copy failed!", 3000);
    }
  }
}
