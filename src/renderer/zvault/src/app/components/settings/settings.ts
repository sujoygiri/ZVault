import { Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudRestore } from '../modals/cloud-restore/cloud-restore';
import { CloudDrive, GoogleDriveFile, UserSettings, RestoreMode } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import { DeleteVault } from '../modals/delete-vault/delete-vault';

export type SettingsTab = 'general' | 'security' | 'backup' | 'notifications';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    FormsModule,
    CloudRestore,
    DeleteVault
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  activeTab: SettingsTab = 'general';
  addSetting = output<void>();
  showRestoreModal = signal(false);
  availableBackups = signal<GoogleDriveFile[]>([]);
  isSaveChangesBtnDisable = signal<boolean>(true);
  selectedLocalFilePath = signal('');
  isDeleteVaultModalOpen = signal<boolean>(false);
  timeOutId: any;

  constructor (
    private globalService: GlobalService,
    private toastService: ToastService,
    protected settingsService: SettingsService,
    private themeService: ThemeService
  ) { 
    window.electronAPI?.onSystemThemeChange((theme) => {
      this.handleThemeChange('system');
    });
  }

  async saveSettings() {
    this.settingsService.storedSettings.update(() => ({ ...this.settingsService.settings() }));
    const settingSavedResponse = await this.settingsService.saveSettings(this.settingsService.settings());
    if (settingSavedResponse?.success) {
      this.isSaveChangesBtnDisable.set(true);
      this.handleThemeChange(this.settingsService.settings().theme);
      this.toastService.success(settingSavedResponse?.message as string);
    } else {
      this.isSaveChangesBtnDisable.set(false);
      this.toastService.error(settingSavedResponse?.message as string);
    }
  }
  
  async resetDefaults() {
    this.settingsService.storedSettings.update(() => ({ ...this.settingsService.settings() }));
    const resetResponse = await this.settingsService.saveSettings(this.settingsService.defaultSettingsValue);
    if (resetResponse?.success) {
      this.isSaveChangesBtnDisable.set(true);
      this.handleThemeChange(this.settingsService.settings().theme);
      this.toastService.info('Settings Reset Successful');
    } else {
      this.isSaveChangesBtnDisable.set(false);
      this.toastService.error('Settings Reset Failed', resetResponse?.message);
    }
  }

  // --- LOCAL BACKUP ACTIONS ---
  async exportLocalBackup() {
    const exportVaultResponse = await window.electronAPI?.exportVaultLocally();
    if (exportVaultResponse?.success) {
      this.toastService.success('Backup Exported', exportVaultResponse.message);
    } else {
      this.toastService.error('Export Failed', exportVaultResponse?.message);
    }
  }

  async importLocalBackup() {
    this.globalService.importType.set('local');
    const fileSelectResponse = await window.electronAPI?.chooseLocalFile();
    if(fileSelectResponse?.success) {
      this.selectedLocalFilePath.set(fileSelectResponse.data);
      this.showRestoreModal.set(true);
    } else {
      this.toastService.error("File Select", fileSelectResponse?.message, 3000);
    }
  }

  // --- CLOUD SYNC ACTIONS ---
  async connectCloud(provider: CloudDrive) {
    // Initiate OAuth flow
    this.globalService.importType.set('cloud');
    const backupResponse = await window.electronAPI?.connectToCloud(provider);
    console.log(backupResponse);
    if (backupResponse?.isBackupPresent && backupResponse.data) {
      this.showRestoreModal.set(true);
      this.availableBackups.set(backupResponse.data);
      // this.settings.update((prev) => ({
      //   ...prev,
      //   cloudProvider: provider,
      //   cloudAccountEmail: provider === 'google' ? 'user@gmail.com' : 'user@outlook.com'
      // }));
      // this.toastService.success(
      //   'Cloud Connected',
      //   `Vault synchronized with ${provider === 'google' ? 'Google Drive' : 'Microsoft OneDrive'}.`
      // );
    }
  }

  disconnectCloud(): void {
    this.settingsService.settings().cloudProvider = 'none';
    this.settingsService.settings().cloudAccountEmail = 'none';

    this.toastService.warning('Cloud Disconnected', 'Cloud synchronization has been disabled.');
  }


  onModalDismiss() {
    this.showRestoreModal.set(false);
  }

  async handleCloudRestore(backupId: string, backupName: string, mode: RestoreMode, password?: string) {

  }

  async handleLocalRestore(mode: RestoreMode, password?: string) {
    if(password && this.selectedLocalFilePath().length) {
      const localImportResponse = await window.electronAPI?.importLocalBackup(this.selectedLocalFilePath(), password);
      console.log(localImportResponse);
    }
  }

  async onExecuteRestore(event: { backupId: string | null; backupName: string | null; mode: RestoreMode; password?: string; }) {
    this.showRestoreModal.set(false);
    if(event.backupId && event.backupName) {
      console.log(`Executing ${event.mode} with backup ID: ${event.backupId}`);
      console.log('cloud');
    } else {
      await this.handleLocalRestore(event.mode, event.password)
    }

    // if (event.mode === 'replace') {
    //   // Trigger DuckDB overwrite logic via IPC
    //   // await window.electronAPI.replaceDatabase(event.backupId);
    // } else {
    //   // Trigger DuckDB merge logic via IPC
    //   console.log(event.backupId, event.backupName);
    //   // const response = await window.electronAPI?.mergeGoogleCloudBackupFile(event.backupId, event.backupName, event.password);
    //   // console.log({response});
    // }
  }

  handleThemeChange(theme: 'system' | 'dark' | 'light') {   
    switch (theme) {
      case 'light':
        this.themeService.setLightTheme();
        break;
      case 'dark':
        this.themeService.setDarkTheme();
        break;
      case 'system':
        this.themeService.setSystemTheme();
        break;
      default:
        this.themeService.setTheme();
        break;
    }
  }

  handleSettingsUpdate<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    if (this.timeOutId) clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.settingsService.settings.update((currentSettings) => ({
        ...currentSettings,
        [key]: value
      }));
      const isSettingsValueEqual = JSON.stringify(this.settingsService.settings()) === JSON.stringify(this.settingsService.storedSettings());
      if (isSettingsValueEqual) {
        this.isSaveChangesBtnDisable.set(true);
      } else {
        this.isSaveChangesBtnDisable.set(false);
      }
    }, 500);
  }

  async executeVaultDeletion() {
    const deleteResponse = await window.electronAPI?.deleteVault();
    if(deleteResponse && deleteResponse.success) {
      this.toastService.error('Vault Deleted', 'All local vault records have been purged.');
      this.globalService.showAuthForm.set(true);
    }
  }

}
