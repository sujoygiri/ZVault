import { Component, input, model, output, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { GlobalService } from '../../services/global.service';
import { Categories, DataType, PasswordDetails } from '@zvault/shared-api';

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

  categories = ['General', 'Work', 'Personal', 'Finance', 'Social', 'Entertainment'];
  timeoutId: any;

  selectedCategory = signal<Categories>('');
  searchInput = signal<string>('');

  constructor (
    private globalService: GlobalService,
    protected themeService: ThemeService
  ) { }

  async handleDataSearch() {
    const searchResponse = await window.electronAPI?.searchData(this.selectedCategory(), this.searchInput(), this.selectedDataType() ?? 'password', this.globalService.currentPageNum(), this.globalService.pageSize());
    this.globalService.totalEntries.set(searchResponse?.totalEntries ?? 0);
    this.vaultItemPasswords.set(searchResponse?.rows as PasswordDetails[]);
  }

  handlePasswordSearch(event: Event) {
    const targetInput = (event.target) as HTMLInputElement;
    this.searchInput.set(targetInput.value);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      await this.handleDataSearch();
    }, 500);
  }

  async handleCategoryChange(event: Event) {
    const targetElement = (event.target) as HTMLSelectElement;
    this.selectedCategory.set(targetElement.value as Categories);
    await this.handleDataSearch();
  }
}
