import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  imports: [],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.css',
})
export class DeleteConfirmation {
  isOpen = input<boolean>(false);
  itemName = input<string>('this item');
  itemId = input<string | null>(null);

  close = output<void>();
  confirmDelete = output<string>();

  onClose(): void {
    this.close.emit();
  }

  onConfirmDelete(): void {
    const id = this.itemId();
    if (id !== null) {
      this.confirmDelete.emit(id);
    }
  }
}
