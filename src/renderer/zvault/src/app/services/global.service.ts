import { Injectable, signal } from '@angular/core';
import { Categories, DataType, SortingOrder } from '@zvault/shared-api';

export type MenuItem = 'passwords' | 'texts' | 'settings' | 'logout';
export type ImportType = 'initial' | 'local' | 'cloud';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  importType = signal<ImportType>('initial');
  
  // pagination related data
  currentPageNum = signal<number>(1);
  pageSize = signal<number>(12);
  totalEntries = signal<number>(0);

  selectedDataType = signal<DataType>('password');
  selectedMenuItem = signal<MenuItem>('passwords');

  // vault item search function data
  searchInput = signal<string>('');
  selectedCategory = signal<Categories>('');
  selectedSortingOrder = signal<SortingOrder>('date_desc');

  async getVaultData() {
    const vaultData = await window.electronAPI?.fetchData(this.selectedDataType(), this.currentPageNum(), this.pageSize(), this.selectedSortingOrder());
    this.totalEntries.set(vaultData?.totalEntries ?? 0);
    return vaultData;
  }

  async handleDataSearch() {
    const searchResponse = await window.electronAPI?.searchData(this.selectedCategory(), this.searchInput(), this.selectedDataType(), this.currentPageNum(), this.pageSize(), this.selectedSortingOrder());
    this.totalEntries.set(searchResponse?.totalEntries ?? 0);
    return searchResponse;
  }
}
