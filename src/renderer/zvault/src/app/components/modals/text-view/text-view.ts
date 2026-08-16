import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-text-view',
  imports: [],
  templateUrl: './text-view.html',
  styleUrl: './text-view.css'
})
export class TextView {
  isOpen = input<boolean>(false);
  title = input<string>('Information');
  content = input<string>('');

  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
