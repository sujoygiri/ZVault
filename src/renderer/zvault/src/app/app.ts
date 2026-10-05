import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from "./components/sidebar/sidebar";
import { Auth } from "./components/auth/auth";
import { Content } from './components/content/content';
import { ResponsePayload } from '@zvault/shared-api';
import { Toasts } from './components/toasts/toasts';
import { ThemeService } from './services/theme.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule, 
    Auth,
    Content,
    Toasts
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('zvault');

  isLoading = signal<boolean>(false);
  isVaultExist = signal<boolean>(false);
  showAuthForm = signal<boolean>(true);
  vaultData = signal<ResponsePayload | null>(null);

  constructor(
    private themeService: ThemeService, 
    private settingsService: SettingsService
  ) {
    this.themeService.setTheme();
    this.settingsService.loadStoredSettings();
    window.electronAPI?.onWindowStateChange((value) => {
      console.log(value.state);
    })
  }

  ngOnInit(): void {
    this.handleVaultExistStatus();
  }

  async handleVaultExistStatus() {
    try {
      this.isLoading.set(true);
      const status = await window.electronAPI?.vaultExistStatus();
      this.isLoading.set(false);
      console.log({status});
      
      this.isVaultExist.set(status ?? false);
    } catch (error) {
      
    } finally {
      this.isLoading.set(false);
    }
  }

  receivedVaultData(data: ResponsePayload) {
    this.showAuthForm.set(false);
    this.vaultData.set(data);
  }

}
