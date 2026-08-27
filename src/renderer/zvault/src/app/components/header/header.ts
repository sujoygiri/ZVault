import { Component, input, model, output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { GlobalService } from '../../services/global.service';
import { DataType, PasswordDetails } from '@zvault/shared-api';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = input<string>('Vault');
  addButtonText = input<string>('Add Password');
  selectedDataType = input.required<DataType>();
  vaultItemPasswords = model<PasswordDetails[]>();

  toggleTheme = output<void>();
  addData = output<void>();
  sortChange = output<string>();

  timeoutId: any;

  constructor (
    private globalService: GlobalService,
    protected themeService: ThemeService
  ) { }

  handlePasswordSearch(event: Event) {
    const targetInput = (event.target) as HTMLInputElement;
    const searchInput = targetInput.value;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      const searchResponse = await window.electronAPI?.searchData(searchInput, this.selectedDataType() ?? 'password', this.globalService.currentPageNum(), this.globalService.pageSize());
      this.vaultItemPasswords.set(searchResponse?.rows as PasswordDetails[]);
    }, 500);
  }
}
