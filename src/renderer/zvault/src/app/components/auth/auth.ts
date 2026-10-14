import { Component, signal, input, output, OnInit, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ResponsePayload } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';
import { ToastService } from '../../services/toast.service';

export type SetupMode =
  | 'options'
  | 'create-vault'
  | 'local-backup-prompt'
  | 'cloud-platforms'
  | 'cloud-backups-list';

export interface CloudBackupItem {
  id: string;
  name: string;
  size: string;
  lastModified: string;
}

@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {

  isVaultExist = input.required();
  vaultDataEmitter = output<ResponsePayload>();
  isLoading = signal<boolean>(false);
  setupMode = signal<SetupMode>('options');
  passwordVisibilityState = signal(false);
  isButtonShaking = signal<boolean>(false);
  selectedFilePath = signal<string | null>(null);
  isPasswordShaking = signal<boolean>(false);
  localBackupPasswordInput = viewChild<ElementRef<HTMLInputElement>>('localBackupPasswordInput');

  // Forms
  unlockVaultForm!: FormGroup;
  createVaultForm!: FormGroup;
  localBackupForm!: FormGroup;

  // Cloud Backup State
  selectedCloudProvider = signal<string | null>(null);
  cloudBackups = signal<CloudBackupItem[]>([]);
  selectedBackupId = signal<string | null>(null);

  constructor (
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.createVaultForm = this.formBuilder.group({
      username: ["", Validators.required],
      masterPassword: ["", Validators.required],
      confirmMasterPassword: ["", [Validators.required, this.matchedMasterPassword]]
    });

    this.unlockVaultForm = this.formBuilder.group({
      masterPassword: ["", Validators.required]
    });

    this.localBackupForm = this.formBuilder.group({
      backupFilePath: new FormControl({value: null, disabled: true}, Validators.required),
      masterPassword: ['', Validators.required]
    });
  }

  matchedMasterPassword(formControl: AbstractControl): ValidationErrors | null {
    const confirmMasterPassword = formControl.get("confirmMasterPassword")?.value as string;
    const masterPassword = formControl.get("masterPassword")?.value as string;
    if (confirmMasterPassword && masterPassword && (masterPassword === confirmMasterPassword)) {
      return { passwordNotMatched: true };
    }
    return null;
  }

  showHidePassword() {
    this.passwordVisibilityState.set(!this.passwordVisibilityState);
  }

  setSetupMode(mode: SetupMode) {
    this.setupMode.set(mode);
    this.selectedBackupId.set(null);
  }

  async handleVaultUnlock() {
    this.isLoading.set(true);
    const { masterPassword } = this.unlockVaultForm.value;
    const vaultUnlockResponse = await window.electronAPI?.unlockVault(masterPassword);
    if (vaultUnlockResponse?.success) {
      const vaultData = await this.globalService.getVaultData();
      this.vaultDataEmitter.emit(vaultData as ResponsePayload);
      this.isLoading.set(false);
    }
  }

  async handleVaultCreate() {
    const { masterPassword, confirmMasterPassword } = this.createVaultForm.value;
    if (masterPassword !== confirmMasterPassword) {
      this.toastService.error('Password Mismatch', 'Master passwords do not match.');
      return;
    }
    this.isLoading.set(true);
    const vaultCreateResponse = await window.electronAPI?.createNewVault(masterPassword);
    if (vaultCreateResponse?.success) {
      const vaultData = await this.globalService.getVaultData();
      this.vaultDataEmitter.emit(vaultData as ResponsePayload);
      this.isLoading.set(false);
    }
  }

  async handleLocalBackupRestore() {
    if (this.localBackupForm.invalid) return;
    const masterPassword = this.localBackupForm.get('masterPassword')?.value;
    const filePath = this.selectedFilePath();
    if(filePath && masterPassword) {
      this.isLoading.set(true);
      const importResponse = await window.electronAPI?.importLocalBackup(filePath, masterPassword);
      if(importResponse && importResponse.success) {
        const response = await this.globalService.getVaultData();
        this.vaultDataEmitter.emit(response!);
        this.isLoading.set(false);
        this.toastService.success('Backup Restored', importResponse.message ?? 'Local vault successfully restored.');
      } else {
        this.isLoading.set(false);
      }
    } else {
      this.isLoading.set(false);
    }
  }

  async chooseLocalBackupFile() {
    try {
      const fileSelectResponse = await window.electronAPI?.chooseLocalFile();
      if (fileSelectResponse && fileSelectResponse.success && fileSelectResponse.data) {
        const filePath = fileSelectResponse.data;
        this.localBackupForm.patchValue({ backupFilePath: filePath });
        this.selectedFilePath.set(filePath);
        this.localBackupForm.get('backupFilePath')?.enable();
        this.localBackupPasswordInput()?.nativeElement.focus();
        this.toastService.success('File Selected', `File name: ${filePath?.split('\\')?.at(-1)}`);
      } else {
        this.selectedFilePath.set(null);
        this.localBackupForm.patchValue({ backupFilePath: null });
        this.toastService.error('File Error', fileSelectResponse?.message);
        this.localBackupForm.get('backupFilePath')?.disable();
      }
    } catch (error) {
      this.toastService.error('Error', 'Something went wrong. Restart the app');
    }
  }

  // Update warning trigger for the disabled master password input
  triggerFileSelectionWarning() {
    if (!this.localBackupForm.get('backupFilePath')?.value) {
      this.localBackupForm.get('backupFilePath')?.disable();
      this.toastService.warning('Vault File Required', 'Please choose a backup file path first.');
      this.isButtonShaking.set(true);
      setTimeout(() => {
        this.isButtonShaking.set(false);
      }, 400);
    } else {
      this.localBackupForm.get('backupFilePath')?.enable();
    }
  }

  connectCloudProvider(provider: 'google' | 'microsoft' | 'dropbox') {
    if (provider !== 'google') {
      this.toastService.info('Coming Soon', `${provider.charAt(0).toUpperCase() + provider.slice(1)} integration will be available soon.`);
      return;
    }

    this.selectedCloudProvider.set(provider);
    this.isLoading.set(true);

    // Simulate Google Drive OAuth and fetching backups
    setTimeout(() => {
      this.isLoading.set(false);
      // Mock fetched backups list
      this.cloudBackups.set([
        { id: 'gb-1', name: 'master_vault_backup_2026_05.vaultbak', size: '2.4 MB', lastModified: 'May 10, 2026, 14:32' },
        { id: 'gb-2', name: 'vault_snapshot_auto_2026_04.vaultbak', size: '1.8 MB', lastModified: 'Apr 28, 2026, 09:15' },
        { id: 'gb-3', name: 'backup_export_initial.vaultbak', size: '940 KB', lastModified: 'Mar 15, 2026, 18:40' }
      ]);
      this.setupMode.set('cloud-backups-list');
      this.toastService.success('Connected to Google Drive', 'Retrieved available vault backups.');
    }, 1500);
  }

  selectCloudBackup(id: string) {
    this.selectedBackupId.set(id);
  }

  restoreSelectedCloudBackup() {
    if (!this.selectedBackupId()) return;
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.toastService.success('Cloud Restore Successful', 'Vault synchronized and unlocked.');
      // this.isVaultExist = true;
    }, 1200);
  }

}
