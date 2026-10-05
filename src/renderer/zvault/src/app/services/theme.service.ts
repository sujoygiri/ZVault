import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSignal = signal<boolean>(false);
  readonly isDarkMode = this.isDarkSignal.asReadonly();

  constructor () {
    this.initializeTheme();
  }

  /**
   * Evaluates local storage or fallbacks to native OS settings on startup
   */
  private initializeTheme(): void {
    const cachedTheme = localStorage.getItem('user-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = cachedTheme === 'dark' || (!cachedTheme && systemPrefersDark);
    this.isDarkSignal.set(useDark);
    this.updateRenderedDOM(useDark);
  }

  /**
   * Main entry point to switch theme layouts
   */
  setTheme(): void {
    const isDarkThemeActive = this.isDarkMode();
    localStorage.setItem('user-theme', isDarkThemeActive ? 'dark' : 'light');
    this.updateRenderedDOM(isDarkThemeActive);
  }

  // set dark theme
  setDarkTheme() {
    this.isDarkSignal.set(true);
    localStorage.setItem('user-theme', 'dark');
    this.updateRenderedDOM(this.isDarkMode());
  }
  
  // set light theme
  setLightTheme() {
    this.isDarkSignal.set(false);
    localStorage.setItem('user-theme', 'light');
    this.updateRenderedDOM(this.isDarkMode());
  }

  // set system theme
  setSystemTheme() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(systemPrefersDark) {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
    localStorage.removeItem('user-theme');
  }

  /**
   * Applies or removes the 'dark' style rule class directly into the global root document tree
   */
  private updateRenderedDOM(isDark: boolean): void {
    const rootElement = document.documentElement;
    if (isDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }
}
