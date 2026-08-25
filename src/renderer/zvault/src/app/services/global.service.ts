import { Injectable, signal } from '@angular/core';
import { DataType } from '@zvault/shared-api';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  currentPageNum = signal<number>(1);
  pageSize = signal<number>(12);
  totalEntries = signal<number>(0);

  async getVaultData(dataType: DataType) {
    const vaultData = await window.electronAPI?.fetchData(dataType,this.currentPageNum(),this.pageSize());
    this.totalEntries.set(vaultData?.totalEntries ?? 0);
    return vaultData;
  }
}
