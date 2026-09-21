import { Component, input, output, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudRestore, RestoreMode } from '../modals/cloud-restore/cloud-restore';
import { CloudDrive, GoogleDriveFile } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';

export type SettingsTab = 'general' | 'security' | 'backup' | 'notifications';

export interface VaultSettings {
  // General
  vaultName: string;
  theme: 'system' | 'dark' | 'light';
  clipboardClearDelay: number; // in seconds
  maskSensitiveData: boolean;

  // Security
  autoLockDelay: number; // in minutes (0 = immediately)
  lockOnSystemSleep: boolean;
  clearClipboardOnLock: boolean;

  // Backup & Sync
  autoBackupEnabled: boolean;
  autoBackupInterval: 'daily' | 'weekly' | 'monthly';
  cloudProvider: CloudDrive;
  cloudAccountEmail?: string;
  lastBackupTimestamp?: string;
}

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    FormsModule,
    CloudRestore
],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  activeTab: SettingsTab = 'general';
  addSetting = output<void>();
  showRestoreModal = signal(false);
  availableBackups = signal<GoogleDriveFile[]>([]); // Optional custom backups list


  // Vault Settings Model State
  settings = signal<VaultSettings>({
    vaultName: 'Personal Master Vault',
    theme: 'dark',
    clipboardClearDelay: 30,
    maskSensitiveData: true,
    autoLockDelay: 5,
    lockOnSystemSleep: true,
    clearClipboardOnLock: true,
    autoBackupEnabled: false,
    autoBackupInterval: 'weekly',
    cloudProvider: 'none',
    cloudAccountEmail: 'none'
  });

  constructor (
    private globalService: GlobalService,
    private toastService: ToastService
  ) { }

  saveSettings(): void {
    // Persist settings logic here (e.g., call Vault Config API / LocalStorage)
    this.toastService.success(
      'Settings Saved',
      'Your vault preferences have been updated successfully.'
    );
  }

  resetDefaults(): void {
    this.settings.set({
      vaultName: 'Personal Master Vault',
      theme: 'dark',
      clipboardClearDelay: 30,
      maskSensitiveData: true,
      autoLockDelay: 5,
      lockOnSystemSleep: true,
      clearClipboardOnLock: true,
      autoBackupEnabled: false,
      autoBackupInterval: 'weekly',
      cloudProvider: 'none',
      cloudAccountEmail: 'none'
    });

    this.toastService.info('Settings Reset', 'Restored default vault configuration.');
  }

  // --- LOCAL BACKUP ACTIONS ---
  async exportLocalBackup()  {
    const exportVaultResponse = await window.electronAPI?.exportVaultLocally()
    if(exportVaultResponse?.success) {
      this.toastService.success('Backup Exported', exportVaultResponse.message);
    } else {
      this.toastService.error('Export Failed', exportVaultResponse?.message);
    }
  }

  importLocalBackup() {
    this.globalService.importType.set('local');
    this.showRestoreModal.set(true);
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
    this.settings().cloudProvider = 'none';
    this.settings().cloudAccountEmail = 'none';

    this.toastService.warning('Cloud Disconnected', 'Cloud synchronization has been disabled.');
  }

  
  onModalDismiss() {
    this.showRestoreModal.set(false);
  }

  async onExecuteRestore(event: { backupId: string | null; backupName: string | null; mode: RestoreMode; password?: string }) {
    console.log(`Executing ${event.mode} with backup ID: ${event.backupId}`);
    this.showRestoreModal.set(false);

    if (event.mode === 'replace') {
      // Trigger DuckDB overwrite logic via IPC
      // await window.electronAPI.replaceDatabase(event.backupId);
    } else {
      // Trigger DuckDB merge logic via IPC
      console.log(event.backupId, event.backupName);
      // const response = await window.electronAPI?.mergeGoogleCloudBackupFile(event.backupId, event.backupName, event.password);
      // console.log({response});
    }
  }
}
