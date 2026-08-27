import { Component, input, output } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  cloudProvider: 'none' | 'google' | 'microsoft';
  cloudAccountEmail?: string;
  lastBackupTimestamp?: string;
}

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  activeTab: SettingsTab = 'general';

  addSetting = output<void>();

  // Vault Settings Model State
  settings: VaultSettings = {
    vaultName: 'Personal Master Vault',
    theme: 'dark',
    clipboardClearDelay: 30,
    maskSensitiveData: true,
    autoLockDelay: 5,
    lockOnSystemSleep: true,
    clearClipboardOnLock: true,
    autoBackupEnabled: false,
    autoBackupInterval: 'weekly',
    cloudProvider: 'none'
  };

  constructor (private toastService: ToastService) {}

  saveSettings(): void {
    // Persist settings logic here (e.g., call Vault Config API / LocalStorage)
    this.toastService.success(
      'Settings Saved',
      'Your vault preferences have been updated successfully.'
    );
  }

  resetDefaults(): void {
    this.settings = {
      vaultName: 'Personal Master Vault',
      theme: 'dark',
      clipboardClearDelay: 30,
      maskSensitiveData: true,
      autoLockDelay: 5,
      lockOnSystemSleep: true,
      clearClipboardOnLock: true,
      autoBackupEnabled: false,
      autoBackupInterval: 'weekly',
      cloudProvider: 'none'
    };

    this.toastService.info('Settings Reset', 'Restored default vault configuration.');
  }

  // --- LOCAL BACKUP ACTIONS ---
  exportLocalBackup(): void {
    const backupData = JSON.stringify({
      timestamp: new Date().toISOString(),
      vault: this.settings.vaultName,
      data: 'ENCRYPTED_PAYLOAD_HERE'
    });

    const blob = new Blob([backupData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vault-backup-${Date.now()}.vaultbak`;
    a.click();
    URL.revokeObjectURL(url);

    this.toastService.success('Backup Exported', 'Local encrypted backup saved to downloads.');
  }

  importLocalBackup(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Parse & decrypt backup payload
        this.toastService.success('Backup Restored', `Successfully loaded "${file.name}".`);
      };

      reader.readAsText(file);
    }
  }

  // --- CLOUD SYNC ACTIONS ---
  connectCloud(provider: 'google' | 'microsoft'): void {
    // Initiate OAuth flow
    this.settings.cloudProvider = provider;
    this.settings.cloudAccountEmail = provider === 'google' ? 'user@gmail.com' : 'user@outlook.com';

    this.toastService.success(
      'Cloud Connected',
      `Vault synchronized with ${provider === 'google' ? 'Google Drive' : 'Microsoft OneDrive'}.`
    );
  }

  disconnectCloud(): void {
    this.settings.cloudProvider = 'none';
    this.settings.cloudAccountEmail = undefined;

    this.toastService.warning('Cloud Disconnected', 'Cloud synchronization has been disabled.');
  }
}
