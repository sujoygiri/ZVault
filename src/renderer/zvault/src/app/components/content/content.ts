import { CommonModule } from '@angular/common';
import { Component, input, model, OnInit, signal } from '@angular/core';
import { ResponsePayload, PasswordDetails, TextDetails, DataType, NewText } from '@zvault/shared-api';
import { ThemeService } from '../../services/theme.service';
import { GlobalService, MenuItem } from '../../services/global.service';
import { ViewNote } from "../modals/view-note/view-note";
import { DeleteConfirmation } from "../modals/delete-confirmation/delete-confirmation";
import { AddData } from "../modals/add-data/add-data";
import { Pagination } from "../pagination/pagination";
import { ToastService } from '../../services/toast.service';
import { Settings } from "../settings/settings";
import { Sidebar } from '../sidebar/sidebar';
import { PasswordView } from '../password-view/password-view';
import { TextView } from "../text-view/text-view";
import { UpdateService } from '../../services/update.service';


@Component({
  selector: 'app-content',
  imports: [
    CommonModule,
    Sidebar,
    PasswordView,
    Settings,
    Pagination,
    AddData,
    ViewNote,
    DeleteConfirmation,
    TextView
  ],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {

  // after auth input data
  vaultData = input<ResponsePayload | null>();
  // State Signals
  vaultItemPasswords = model<PasswordDetails[]>([]);
  vaultItemTexts = model<TextDetails[]>([]);

  // Modal State Signals
  isAddEditDataModalOpen = signal<boolean>(false);
  dataEntryMode = signal<'add' | 'edit'>('add');

  isTextViewModalOpen = signal<boolean>(false);
  textTitle = signal<string>('');
  textContent = signal<string>('');

  isDeleteConfirmationModalOpen = signal<boolean>(false);
  deleteTargetId = signal<any>(null);
  deleteTargetName = signal<string>('');

  // Tracked edit payloads
  passwordDataToBeEdited = signal<PasswordDetails | null>(null);
  textDataToBeEdited = signal<any>(null);

  constructor (
    private toastService: ToastService,
    protected globalService: GlobalService,
    protected updateService: UpdateService,
  ) { }

  ngOnInit(): void {
    this.vaultItemPasswords.set(this.vaultData()?.rows as PasswordDetails[]);
  }

  // Navigation Handler
  async handleMenuItemSelect(item: MenuItem) {
    this.globalService.selectedMenuItem.set(item);
    this.globalService.currentPageNum.set(1);
    if (item === 'passwords') {
      this.globalService.selectedDataType.set('password');
      const vaultData = await this.globalService.getVaultData();
      this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
    }
    if (item === 'texts') {
      this.globalService.selectedDataType.set('text');
      const vaultData = await this.globalService.getVaultData();
      console.log(vaultData);
      
      this.vaultItemTexts.set(vaultData?.rows as TextDetails[]);
    }
  }

  // Data Actions & Modals
  openNoteViewModal(title: string, content: string): void {
    this.textTitle.set(title);
    this.textContent.set(content);
    this.isTextViewModalOpen.set(true);
  }

  handlePasswordDataEdit(item: PasswordDetails, type: DataType): void {
    this.globalService.selectedDataType.set(type);
    this.passwordDataToBeEdited.set(item);
    this.dataEntryMode.set('edit');
    this.isAddEditDataModalOpen.set(true);
  }

  handleTextDataEdit(item: TextDetails, type: DataType) {
    this.globalService.selectedDataType.set(type);
    this.textDataToBeEdited.set(item);
    this.dataEntryMode.set('edit');
    this.isAddEditDataModalOpen.set(true);
  }

  openDeleteConfirmationModal(id: string, title: string, type: DataType): void {
    this.globalService.selectedDataType.set(type);
    this.deleteTargetId.set(id);
    this.deleteTargetName.set(title);
    this.isDeleteConfirmationModalOpen.set(true);
  }

  async handleSavePassword(payload: PasswordDetails) {
    payload.type = "password";
    this.globalService.selectedDataType.set('password');
    if(this.dataEntryMode() === 'add') {
      const addDataResponse = await window.electronAPI?.addNewData(payload);
      if (addDataResponse?.success) {
        this.toastService.success('Password', addDataResponse.message);
        const vaultData = await this.globalService.handleDataSearch();
        this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
      } else {
        this.toastService.error('Password', addDataResponse?.message);
      }
    }
    if(this.dataEntryMode() === 'edit') {
      const updatedPasswordData = {
        id: this.passwordDataToBeEdited()?.id ?? '',
        title: payload.title,
        category: payload.category,
        url: payload.url,
        usernameOrEmail: payload.usernameOrEmail,
        password: payload.password,
        note: payload.note,
        icon_hint: this.passwordDataToBeEdited()?.icon_hint ?? '',
        is_favorite: this.passwordDataToBeEdited()?.is_favorite ?? false,
        // last_modified: this.passwordDataToBeEdited()?.last_modified ?? '',
        type: 'password'
      };
      const editDataResponse = await window.electronAPI?.editData(updatedPasswordData as PasswordDetails);
      if(editDataResponse?.success) {
        this.toastService.success('Password', editDataResponse.message);
        const vaultData = await this.globalService.handleDataSearch();
        this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
      } else {
        this.toastService.error('Password', editDataResponse?.message);
      }
    }
    this.isAddEditDataModalOpen.set(false);
  }

  async handleSaveText(payload: NewText) {
    payload.type = "text";
    this.globalService.selectedDataType.set('text');
    if(this.dataEntryMode() === 'add') {
      const addDataResponse = await window.electronAPI?.addNewData(payload);
      if(addDataResponse?.success){
        this.toastService.success('Text', addDataResponse.message);
        const vaultData = await this.globalService.handleDataSearch();
        this.vaultItemTexts.set(vaultData?.rows as TextDetails[]);
      } else {
        this.toastService.error('Text', addDataResponse?.message);
      }
    }
    if(this.dataEntryMode() === 'edit') {
      const updatedTextData = {
        id: this.textDataToBeEdited()?.id ?? '',
        title: payload.title,
        category: payload.category,
        content: payload.content,
        // icon_hint: this.passwordDataToBeEdited()?.icon_hint ?? '',
        is_favorite: this.textDataToBeEdited()?.is_favorite ?? false,
        type: 'text'
      };
      const editDataResponse = await window.electronAPI?.editData(updatedTextData as TextDetails);
      if (editDataResponse?.success) {
        this.toastService.success('Password', editDataResponse.message);
        const vaultData = await this.globalService.handleDataSearch();
        this.vaultItemTexts.set(vaultData?.rows as TextDetails[]);
      } else {
        this.toastService.error('Password', editDataResponse?.message);
      }
    }
    this.isAddEditDataModalOpen.set(false);    
  }

  async handleDelete(id: string) {
    try {
      const dataDeleteResponse = await window.electronAPI?.deleteData(id, this.globalService.selectedDataType());
      if (dataDeleteResponse?.success) {
        this.toastService.success(this.deleteTargetName(), dataDeleteResponse.message);
        const vaultData = await this.globalService.handleDataSearch();
        if (this.globalService.selectedDataType() === 'password') {
          this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
        }
        if (this.globalService.selectedDataType() === 'text') {
          this.vaultItemTexts.set(vaultData?.rows as TextDetails[]);
        }
        this.isDeleteConfirmationModalOpen.set(false);
      } else {
        this.toastService.error(dataDeleteResponse?.message ?? "Something went wrong");
        this.isDeleteConfirmationModalOpen.set(false);
      }
    } catch (error) {
      console.error(error);
      this.toastService.error("Something went wrong");
      this.isDeleteConfirmationModalOpen.set(false);
    }
  }

  // Pagination Callbacks
  async onPageChange(page: number) {
    this.globalService.currentPageNum.set(page);
    await this.setVaultDataBasedOnType();
  }
  
  async onPageSizeChange(size: number) {
    this.globalService.currentPageNum.set(1);
    this.globalService.pageSize.set(size);
    await this.setVaultDataBasedOnType();
  }

  async setVaultDataBasedOnType() {
    const vaultData = await this.globalService.handleDataSearch();
    if (this.globalService.selectedDataType() === 'password') {
      this.vaultItemPasswords.set(vaultData?.rows as PasswordDetails[]);
    }
    if (this.globalService.selectedDataType() === 'text') {
      this.vaultItemTexts.set(vaultData?.rows as TextDetails[]);
    }
  }
}
