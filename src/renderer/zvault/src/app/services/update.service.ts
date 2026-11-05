import { computed, Injectable, NgZone, signal } from '@angular/core';

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'up-to-date' | 'error';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  readonly currentVersion = signal<string>('1.0.0');
  readonly status = signal<UpdateStatus>('idle');
  readonly latestVersion = signal<string>('');
  readonly progress = signal<number>(0);
  readonly downloadSpeedKB = signal<string>('0');
  readonly errorMessage = signal<string>('');
  readonly bannerDismissed = signal<boolean>(false);

  // True whenever an update is waiting to be downloaded, actively downloading, or ready to restart
  readonly hasUpdateAction = computed(() => {
    const s = this.status();
    return s === 'available' || s === 'downloading' || s === 'downloaded';
  });

  constructor (private ngZone: NgZone) {
    this.initListeners();
  }

  private initListeners() {
    if (!window.electronAPI) return;

    window.electronAPI?.getAppVersion().then((ver) => {
      this.ngZone.run(() => this.currentVersion.set(ver));
    });

    window.electronAPI?.onUpdateAvailable((info) => {
      this.ngZone.run(() => {
        this.latestVersion.set(info.version);
        this.status.set('available');
        this.bannerDismissed.set(false);
      });
    });

    window.electronAPI?.onUpdateNotAvailable(() => {
      this.ngZone.run(() => {
        if (this.status() === 'checking') {
          this.status.set('up-to-date');
        }
      });
    });

    window.electronAPI?.onDownloadProgress((prog) => {
      this.ngZone.run(() => {
        this.status.set('downloading');
        this.progress.set(Math.round(prog.percent));
        this.downloadSpeedKB.set((prog.bytesPerSecond / 1024).toFixed(1));
      });
    });

    window.electronAPI?.onUpdateDownloaded((info) => {
      this.ngZone.run(() => {
        this.latestVersion.set(info.version);
        this.progress.set(100);
        this.status.set('downloaded');
        this.bannerDismissed.set(false);
      });
    });

    window.electronAPI?.onError((msg) => {
      this.ngZone.run(() => {
        this.errorMessage.set(msg);
        this.status.set('error');
      });
    });
  }

  checkForUpdates() {
    if (!window.electronAPI) return;
    this.status.set('checking');
    this.errorMessage.set('');
    window.electronAPI?.checkForUpdates();
  }

  handlePrimaryButtonClick() {
    if (!window.electronAPI) return;

    if (this.status() === 'available' || this.status() === 'error') {
      this.status.set('downloading');
      this.progress.set(2);
      window.electronAPI?.startDownload();
    } else if (this.status() === 'downloaded') {
      window.electronAPI?.quitAndInstall();
    }
  }
}
