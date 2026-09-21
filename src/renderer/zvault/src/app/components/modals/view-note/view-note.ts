import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-view-note',
  imports: [],
  templateUrl: './view-note.html',
  styleUrl: './view-note.css'
})
export class ViewNote {
  isOpen = input<boolean>(false);
  title = input<string>('Information');
  content = input<string>('');

  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
