import { Component, input, model, output, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { GlobalService } from '../../services/global.service';
import { Categories, DataType, PasswordDetails, ResponsePayload, SortingOrder, TextDetails } from '@zvault/shared-api';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = input<string>('Vault');
  addButtonText = input<string>('Add Password');
  
  vaultItemPasswords = model<PasswordDetails[]>();
  vaultItemTexts = model<TextDetails[]>();

  toggleTheme = output<void>();
  addData = output<void>();
  sortChange = output<string>();

  categories = ['General', 'Work', 'Personal', 'Finance', 'Social', 'Entertainment'];
  timeoutId: any;

  constructor (
    private globalService: GlobalService,
    protected themeService: ThemeService
  ) { }

  updateSearchResult(searchResponse: ResponsePayload) {
    if(this.globalService.selectedDataType() === 'password') {
      this.vaultItemPasswords.set(searchResponse.rows as PasswordDetails[]);
    }
    if(this.globalService.selectedDataType() === 'text') {
      this.vaultItemTexts.set(searchResponse.rows as TextDetails[]);
    }
  }

  handleDataSearch(event: Event) {
    const targetInput = (event.target) as HTMLInputElement;
    this.globalService.searchInput.set(targetInput.value);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      const searchResponse = await this.globalService.handleDataSearch();
      if(searchResponse) this.updateSearchResult(searchResponse);
    }, 500);
  }

  async handleCategoryChange(event: Event) {
    const targetElement = (event.target) as HTMLSelectElement;
    this.globalService.selectedCategory.set(targetElement.value as Categories);
    const searchResponse = await this.globalService.handleDataSearch();
    if (searchResponse) this.updateSearchResult(searchResponse);
  }

  async handleDataSorting(event: Event) {
    const targetElement = (event.target) as HTMLSelectElement;
    this.globalService.selectedSortingOrder.set(targetElement.value as SortingOrder);
    const searchResponse = await this.globalService.handleDataSearch();
    if (searchResponse) this.updateSearchResult(searchResponse);
  }
}
