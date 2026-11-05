import { Injectable, signal } from '@angular/core';
import { Categories, DataType, SortingOrder } from '@zvault/shared-api';

export type MenuItem = 'passwords' | 'texts' | 'settings' | 'logout';
export type ImportType = 'initial' | 'local' | 'cloud';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  showAuthForm = signal<boolean>(true);
  isVaultExist = signal<boolean>(false);
  
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

  async checkVaultExistStatus() {
    return await window.electronAPI?.vaultExistStatus();
  }

  formatBytes(bytes: number): string {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  formatDateTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  getRelativeTime(isoString: string): string {
    if (!isoString) return '';
    const diffInSeconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    const intervals: { [key: string]: number; } = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  }
}
