import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = input<string>('Vault');
  addButtonText = input<string>('Add Password');
  isDarkMode = input<boolean>(false);

  toggleTheme = output<void>();
  addData = output<void>();
  sortChange = output<string>();
}
