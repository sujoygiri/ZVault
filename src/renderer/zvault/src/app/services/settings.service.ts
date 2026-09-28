import { Injectable, signal } from '@angular/core';
import { CloudDrive } from '@zvault/shared-api';

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

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  defaultSettingsValue: VaultSettings = {
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
  };

  settings = signal<VaultSettings>(this.defaultSettingsValue);

  constructor() {
    this.loadStoredSettings();
  }

  async loadStoredSettings() {
    const storedSettings = await window.electronAPI?.getUserSettingsData();
    if (storedSettings?.success) {
      this.settings.set(storedSettings.data);
    }
  }

  async saveSettings(settingsToSave: VaultSettings) {
    this.settings.set(settingsToSave);
    return await window.electronAPI?.setUserSettingsData(JSON.stringify(settingsToSave));
  }
}
