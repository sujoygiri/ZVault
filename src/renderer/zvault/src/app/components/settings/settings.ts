import { Component, output, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudDrive, GoogleDriveFile, UserSettings, RestoreMode } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';
import { ThemeService } from '../../services/theme.service';
import { SettingsService } from '../../services/settings.service';
import { DeleteVault } from '../modals/delete-vault/delete-vault';
import { UpdateService } from '../../services/update.service';

export type SettingsTab = 'general' | 'security' | 'backup' | 'notifications' | 'updates';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    FormsModule,
    DeleteVault
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  activeTab: SettingsTab = 'general';
  addSetting = output<void>();
  availableBackups = signal<GoogleDriveFile[]>([]);
  isSaveChangesBtnDisable = signal<boolean>(true);
  isDeleteVaultModalOpen = signal<boolean>(false);
  timeOutId: any;

  constructor (
    private globalService: GlobalService,
    private toastService: ToastService,
    private themeService: ThemeService,
    protected settingsService: SettingsService,
    protected updateService: UpdateService,
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

  async exportLocalBackup() {
    const exportVaultResponse = await window.electronAPI?.exportVaultLocally();
    if (exportVaultResponse?.success) {
      this.toastService.success('Backup Exported', exportVaultResponse.message);
    } else {
      this.toastService.error('Export Failed', exportVaultResponse?.message);
    }
  }

  async connectCloud(provider: CloudDrive) {
    const backupResponse = await window.electronAPI?.connectToCloud(provider);
    console.log(backupResponse);
    if (backupResponse && backupResponse.data) {
      this.settingsService.settings.update(value => ({
        ...value,
        cloudProvider: provider
      }));
    } else {
      this.settingsService.settings.update(value => ({
        ...value,
        cloudProvider: 'none'
      }));
    }
  }

  async triggerManualCloudBackup() {
    const backupToDriveResponse = await window.electronAPI?.backupToDrive();
    if (backupToDriveResponse && backupToDriveResponse.success) {
      this.toastService.success('Backup', backupToDriveResponse.message ?? `Back up successful to ${this.settingsService.settings().cloudProvider}`);
    } else {
      this.toastService.error('Backup', backupToDriveResponse?.message ?? 'Something went wrong during cloud backup');
    }
  }

  disconnectCloud(): void {
    this.settingsService.settings().cloudProvider = 'none';
    this.settingsService.settings().cloudAccountEmail = 'none';

    this.toastService.warning('Cloud Disconnected', 'Cloud synchronization has been disabled.');
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
    if (deleteResponse && deleteResponse.success) {
      this.toastService.error('Vault Deleted', 'All local vault records have been purged.');
      this.globalService.showAuthForm.set(true);
      const vaultExistStatus = await this.globalService.checkVaultExistStatus();
      this.globalService.isVaultExist.set(vaultExistStatus ?? false);
    }
  }

}
