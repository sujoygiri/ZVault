import { Component, signal, input, output, OnInit, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CloudDrive, GoogleDriveFile, ResponsePayload } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';
import { ToastService } from '../../services/toast.service';

export type SetupMode =
  | 'options'
  | 'create-vault'
  | 'local-backup-prompt'
  | 'cloud-platforms'
  | 'cloud-backups-list'
  | 'cloud-master-password';

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
  cloudMasterPasswordForm!: FormGroup;

  // Cloud Backup State
  selectedCloudProvider = signal<CloudDrive>('none');
  cloudBackups = signal<GoogleDriveFile[]>([]);
  selectedBackupFile = signal<{id: string; fileName: string} | null>(null);

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
      backupFilePath: new FormControl({ value: null, disabled: true }, Validators.required),
      masterPassword: ['', Validators.required]
    });

    this.cloudMasterPasswordForm = this.formBuilder.group({
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
    this.selectedBackupFile.set(null);
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
    if (filePath && masterPassword) {
      this.isLoading.set(true);
      const importResponse = await window.electronAPI?.importLocalBackup(filePath, masterPassword);
      if (importResponse && importResponse.success) {
        const response = await this.globalService.getVaultData();
        if(response){
          this.globalService.selectedMenuItem.set('passwords');
          this.vaultDataEmitter.emit(response);
          this.isLoading.set(false);
          this.toastService.success('Backup Restored', importResponse.message ?? 'Local vault successfully restored.');
        } else {
          this.isLoading.set(false);
          this.toastService.error('Backup Restore Failed', importResponse.message ?? 'Something went wrong during backup restore!');
        }
      } else {
        this.isLoading.set(false);
      }
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

  async connectCloudProvider(provider: 'google' | 'microsoft' | 'dropbox') {
    switch (provider) {
      case 'google':
        this.selectedCloudProvider.set('googleDrive');
        break;
      case 'microsoft':
        this.selectedCloudProvider.set('oneDrive');
        break;
      case 'dropbox':
        this.selectedCloudProvider.set('dropBox');
        break;
      default:
        break;
    }
    if (provider !== 'google') {
      this.toastService.info('Coming Soon', `${provider.charAt(0).toUpperCase() + provider.slice(1)} integration will be available soon.`);
      return;
    }
    this.isLoading.set(true);
    const backupResponse = await window.electronAPI?.connectToCloud(this.selectedCloudProvider());
    const backUpVaultFile = backupResponse?.data
    if (backupResponse && backupResponse.isBackupPresent && backUpVaultFile) {
      if(backUpVaultFile.length) {
        const modifiedVaultFile = backUpVaultFile.map(file => {
          file.size = this.globalService.formatBytes(Number(file.size ?? 0));
          file.createdTime = this.globalService.formatDateTime(String(file.createdTime));
          return file;
        });
        this.cloudBackups.set(modifiedVaultFile);
        this.setupMode.set('cloud-backups-list');
        this.toastService.success('Connected to Google Drive', 'Retrieved available vault backups.');
      } else {
        this.setupMode.set('options');
        this.toastService.success('No Backup Found', 'No backup file found in the Google Drive!');
      }
    }
    this.isLoading.set(false);
  }

  proceedToCloudMasterPassword() {
    if (!this.selectedBackupFile()) {
      this.toastService.warning('Selection Required', 'Please choose a backup file to proceed.');
      return;
    }
    this.setupMode.set('cloud-master-password');
  }

  async handleCloudBackupRestore() {
    if (this.cloudMasterPasswordForm.invalid) return;

    const backupItem = this.selectedBackupFile();
    const masterPassword = this.cloudMasterPasswordForm.get('masterPassword')?.value;

    if (!backupItem) return;

    const payload = {
      fileId: backupItem.id,
      fileName: backupItem.fileName,
      masterPassword: masterPassword
    };

    this.isLoading.set(true);

    try {
      const cloudBackupResponse = await window.electronAPI?.importCloudBackup(payload.fileId, payload.fileName, payload.masterPassword);
      if(cloudBackupResponse && cloudBackupResponse.success) {
        this.toastService.success('Cloud Restore Successful', 'Vault synchronized and unlocked.');
        const vaultDataResponse = await this.globalService.getVaultData();
        if(vaultDataResponse) {
          this.globalService.selectedMenuItem.set('passwords');
          this.vaultDataEmitter.emit(vaultDataResponse);
        } else {
          this.toastService.error('Data Error', cloudBackupResponse?.message || 'Failed to load Vault data.');
        }
      } else {
        this.toastService.error('Restore Failed', cloudBackupResponse?.message || 'Invalid master password or corrupted backup.');
      }
      this.isLoading.set(false);
    } catch (error) {
      this.isLoading.set(false);
      this.toastService.error('Error', 'An error occurred while Importing cloud backup.');
    }
  }

}
