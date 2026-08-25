import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { ResponsePayload, PasswordDetails, TextDetails, NewPassword, SensitivePasswordData, TotalPasswordData, DataType, NewText } from '@zvault/shared-api';
import { ThemeService } from '../../services/theme.service';
import { GlobalService } from '../../services/global.service';
import { TimeAgoPipe } from '../../utils/time-ago.pipe';
import { ToggleStateDirective } from '../../directives/toggle-state.directive';
import { TextView } from "../modals/text-view/text-view";
import { DeleteConfirmation } from "../modals/delete-confirmation/delete-confirmation";
import { AddData, PasswordPayload, TextPayload } from "../modals/add-data/add-data";
import { Pagination } from "../pagination/pagination";
import { ToastService } from '../../services/toast.service';
import { Settings } from "../settings/settings";
import { Sidebar } from '../sidebar/sidebar';
import { PasswordView } from '../password-view/password-view';

export type MenuItems = 'passwords' | 'texts' | 'settings';


@Component({
  selector: 'app-content',
  imports: [
    CommonModule,
    Sidebar,
    PasswordView,
    Settings,
    Pagination,
    AddData,
    TextView,
    DeleteConfirmation
],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {

  // after auth input data
  vaultData = input<ResponsePayload | null>();
  // State Signals
  selectedMenuItem = signal<'passwords' | 'settings'>('passwords');
  vaultItemPasswords = signal<PasswordDetails[]>([]);

  // Modal State Signals
  isAddEditDataModalOpen = signal<boolean>(false);
  dataEntryMode = signal<'add' | 'edit'>('add');
  selectedDataType = signal<string>('password');

  isTextViewModalOpen = signal<boolean>(false);
  textTitle = signal<string>('');
  textContent = signal<string>('');

  isDeleteConfirmationModalOpen = signal<boolean>(false);
  deleteTargetId = signal<any>(null);
  deleteTargetName = signal<string>('');

  // Tracked edit payloads
  passwordDataToBeEdited = signal<any>(null);
  textDataToBeEdited = signal<any>(null);

  constructor(
    protected globalService: GlobalService,
    private themeService: ThemeService,
    private toastService: ToastService
  ) { }
  
  ngOnInit(): void {
    console.log(this.vaultData());
    
    this.vaultItemPasswords.set(this.vaultData()?.rows as PasswordDetails[])
  }

  // Navigation Handler
  handleMenuItemSelect(item: 'passwords' | 'settings'): void {
    this.selectedMenuItem.set(item);
  }

  // Header & View Action Handlers
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  handleSortChange(sortOption: string): void {
    console.log('Sorting trigger:', sortOption);
  }

  handleSettingsAdd(): void {
    console.log('Add preference action triggered from Settings view');
  }

  // Data Actions & Modals
  openTextViewModal(id: any, title: string, stateRef: any): void {
    this.textTitle.set(title);
    this.textContent.set(stateRef?.attachedData()?.note || 'No notes available for this entry.');
    this.isTextViewModalOpen.set(true);
  }

  handlePasswordDataEdit(item: any, stateRef: any): void {
    this.passwordDataToBeEdited.set(item);
    this.dataEntryMode.set('edit');
    this.isAddEditDataModalOpen.set(true);
  }

  openDeleteConfirmationModal(id: any, title: string): void {
    this.deleteTargetId.set(id);
    this.deleteTargetName.set(title);
    this.isDeleteConfirmationModalOpen.set(true);
  }

  async handleSavePassword(payload: NewPassword) {
    if(payload){
      payload.type = "password";
      const response = await window.electronAPI?.addNewData(payload);
      if(response?.success){
        this.toastService.success('Password', response.message);
        const vaultData = await this.globalService.getVaultData(payload.type);
        this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
      }else{
        this.toastService.error('Password', response?.message);
      }
    }
    this.isAddEditDataModalOpen.set(false);
  }

  handleSaveText(payload: any): void {
    this.isAddEditDataModalOpen.set(false);
  }

  handleDelete(id: any): void {
    this.isDeleteConfirmationModalOpen.set(false);
  }

  // Pagination Callbacks
  onPageChange(page: number): void {
    this.globalService.currentPageNum.set(page);
  }

  onPageSizeChange(size: number): void {
    this.globalService.pageSize.set(size);
  }
}
