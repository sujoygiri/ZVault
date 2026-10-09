import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { GoogleDriveFile, RestoreMode } from '@zvault/shared-api';
import { GlobalService } from '../../../services/global.service';



@Component({
  selector: 'app-cloud-restore',
  imports: [CommonModule],
  templateUrl: './cloud-restore.html',
  styleUrl: './cloud-restore.css',
})
export class CloudRestore {
  backups = input<GoogleDriveFile[]>([]);

  skip = output<void>();
  restore = output<{ backupId: string | null; backupName: string | null; mode: RestoreMode; password?: string; }>();

  currentStep = signal<'prompt' | 'select' | 'confirm-replace' | 'password'>('prompt');
  selectedBackupId = signal<string | null>(null);
  selectedBackupName = signal<string | null>(null);
  masterPassword = signal<string>('');
  pendingMode = signal<RestoreMode | null>(null);

  formattedBackups = computed(() => {
    return this.backups().map((file) => ({
      raw: file,
      formattedSize: this.formatBytes(Number(file.size || 0)),
      formattedDate: this.formatDateTime(file.createdTime as string),
      relativeTime: this.getRelativeTime(file.createdTime as string),
      archiveLabel: (file.mimeType as any).split('/').pop()?.replace('x-', '') || 'zip'
    }));
  });

  selectedBackup = computed(() =>
    this.backups().find(b => b.id === this.selectedBackupId()) ?? null
  );

  isSelectActionDisabled = computed(() => {
    if (this.globalService.importType() === 'cloud') return !this.selectedBackupId();
    if (this.globalService.importType() === 'local') return !this.masterPassword();
    return true;
  });

  constructor(protected globalService: GlobalService){}

  ngOnInit() {
    const type = this.globalService.importType();
    if (type === 'initial') {
      this.currentStep.set('password');
    } else if (type === 'local') {
      this.currentStep.set('select');
    } else {
      this.currentStep.set('prompt');
      if (this.backups().length > 0) {
        this.selectedBackupId.set((this.backups()[0] as any).id);
      }
    }
  }

  updatePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.masterPassword.set(input.value);
  }

  goBackFromSelect() {
    if (this.globalService.importType() === 'cloud') {
      this.currentStep.set('prompt');
    } else {
      this.skip.emit();
    }
  }

  handleMergeClick() {
    if (this.globalService.importType() === 'local') {
      this.executeAction('merge');
    } else {
      this.pendingMode.set('merge');
      this.currentStep.set('password');
    }
  }

  handleReplaceClick() {
    this.pendingMode.set('replace');
    this.currentStep.set('confirm-replace');
  }

  handleConfirmReplace() {
    if (this.globalService.importType() === 'local') {
      this.executeAction('replace');
    } else {
      this.currentStep.set('password');
    }
  }

  goBackFromPassword() {
    if (this.globalService.importType() === 'initial') {
      this.skip.emit();
    } else {
      this.currentStep.set(this.pendingMode() === 'replace' ? 'confirm-replace' : 'select');
    }
  }

  handlePasswordSubmit() {
    const mode: RestoreMode = this.globalService.importType() === 'initial' ? 'merge' : this.pendingMode()!;
    this.executeAction(mode);
  }

  private executeAction(mode: RestoreMode) {
    const backupId = this.globalService.importType() === 'cloud' ? this.selectedBackupId() : null;
    const backupName = this.globalService.importType() === 'cloud' ? this.selectedBackupName() : null;
    this.restore.emit({
      backupId,
      backupName,
      mode,
      password: this.masterPassword()
    });
  }

  private formatBytes(bytes: number): string {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private formatDateTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  private getRelativeTime(isoString: string): string {
    if (!isoString) return '';
    const diffInSeconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
    const intervals: { [key: string]: number; } = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
    return 'just now';
  }
}
