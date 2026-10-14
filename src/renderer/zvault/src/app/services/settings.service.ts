import { Injectable, signal } from '@angular/core';
import { CloudDrive, UserSettings } from '@zvault/shared-api';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  defaultSettingsValue: UserSettings = {
    vaultName: 'Personal Master Vault',
    theme: 'dark',
    requirePasswordOnStartup: false,
    launchOnStartup: false,
    minimizeToTrayOnClose: true,
    compactCardView: false,
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

  settings = signal<UserSettings>(this.defaultSettingsValue);
  storedSettings = signal<UserSettings | null>(null);

  async loadStoredSettings() {
    const settingsResponse = await window.electronAPI?.getUserSettingsData();
    if (settingsResponse?.success) {      
      this.settings.set(settingsResponse.data);
      this.storedSettings.set({...settingsResponse.data});
    }
  }

  async saveSettings(settingsToSave: UserSettings) {
    this.settings.set(settingsToSave);
    return await window.electronAPI?.setUserSettingsData(JSON.stringify(settingsToSave));
  }
}
