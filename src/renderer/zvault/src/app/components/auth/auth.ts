import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ResponsePayload } from '@zvault/shared-api';
import { GlobalService } from '../../services/global.service';

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

  @Input() isVaultExist!: boolean;
  @Output() vaultDataEmitter = new EventEmitter<ResponsePayload>();
  passwordVisibilityState: boolean = false;
  createVaultForm!: FormGroup;
  unlockVaultForm!: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private globalService: GlobalService
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
    this.passwordVisibilityState = !this.passwordVisibilityState;
  }

  async handleVaultUnlock() {
    const { masterPassword } = this.unlockVaultForm.value;
    const vaultUnlockResponse = await window.electronAPI?.unlockVault(masterPassword);
    if (vaultUnlockResponse?.success) {
      const vaultData = await this.globalService.getVaultData();
      this.vaultDataEmitter.emit(vaultData);
    }
  }

  async handleVaultCreate() {
    const { masterPassword } = this.createVaultForm.value;
    const vaultCreateResponse = await window.electronAPI?.createNewVault(masterPassword);
    if (vaultCreateResponse?.success) {
      const vaultData = await this.globalService.getVaultData();
      this.vaultDataEmitter.emit(vaultData);
    }
  }
}
