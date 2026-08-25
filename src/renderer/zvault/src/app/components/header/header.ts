import { Component, input, output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = input<string>('Vault');
  addButtonText = input<string>('Add Password');

  toggleTheme = output<void>();
  addData = output<void>();
  sortChange = output<string>();

  constructor(protected themeService: ThemeService){}
}
