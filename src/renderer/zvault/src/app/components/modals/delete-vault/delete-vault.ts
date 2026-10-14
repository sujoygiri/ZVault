import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-vault',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './delete-vault.html',
  styleUrl: './delete-vault.css',
})
export class DeleteVault {
  isOpen = input<boolean>(false);
  close = output<void>();
  confirm = output<void>();

  confirmText = '';

  closeModal() {
    this.confirmText = '';
    this.close.emit();
  }

  confirmDeletion() {
    if (this.confirmText === 'DELETE') {
      this.confirm.emit();
      this.closeModal();
    }
  }
}
