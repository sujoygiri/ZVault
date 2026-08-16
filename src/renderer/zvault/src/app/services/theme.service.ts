import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkSignal = signal<boolean>(false);
  readonly isDarkMode = this.isDarkSignal.asReadonly();

  constructor() {
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
  toggleTheme(): void {
    const nextState = !this.isDarkSignal();
    this.isDarkSignal.set(nextState);
    
    localStorage.setItem('user-theme', nextState ? 'dark' : 'light');
    this.updateRenderedDOM(nextState);
  }

  /**
   * Applies or pulls the 'dark' style rule class directly into the global root document tree
   */
  private updateRenderedDOM(isDark: boolean): void {
    const rootElement = document.documentElement; // Target HTML node element
    
    if (isDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }
}
