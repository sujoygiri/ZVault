import { Component, effect, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataType, NewPassword, NewText, PasswordDetails, TextDetails, TotalPasswordData } from '@zvault/shared-api';

export interface PasswordPayload {
  title: string;
  usernameOrEmail: string;
  password: string;
  category: string;
  url: string;
  note: string;
}

export interface TextPayload {
  title: string;
  content: string;
  category: string;
}

@Component({
  selector: 'app-add-data',
  imports: [ReactiveFormsModule],
  templateUrl: './add-data.html',
  styleUrl: './add-data.css',
})
export class AddData implements OnInit {

  // Inputs / Outputs
  isOpen = input<boolean>(false);
  passwordDataToBeEdited = input<TotalPasswordData | null>(null);
  textDataToBeEdited = input<TextDetails>();
  selectedDataType = input<DataType>();
  close = output<void>();
  savePassword = output<NewPassword>();
  saveText = output<TextPayload | TextDetails>();

  // Active Tab State
  activeTab = signal<DataType>('password');
  isTransitioning = signal<boolean>(false);
  isClosing = signal<boolean>(false);

  // Generator Options State
  showGenerator = signal<boolean>(false);
  passLength = signal<number>(16);
  includeNumbers = signal<boolean>(true);
  includeSymbols = signal<boolean>(true);

  // Categories list
  categories = ['General', 'Work', 'Personal', 'Finance', 'Social'];

  // forms
  passwordForm!: FormGroup;
  textForm!: FormGroup;

  constructor (private formBuilder: FormBuilder) { 
    effect(() => {
      const passwordToEdit = this.passwordDataToBeEdited();
      this.activeTab.set(this.selectedDataType() ?? 'password');
      if (passwordToEdit) {
        this.passwordForm.patchValue(passwordToEdit);
      }
    });
  }

  ngOnInit(): void {    
    this.passwordForm = this.formBuilder.group({
      title: ['', Validators.required],
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
      category: ['General', Validators.required],
      url: [''],
      note: ['']
    });

    this.textForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['General', Validators.required]
    });
  }

  setTab(newTab: DataType): void {
    if (this.activeTab() === newTab || this.isTransitioning()) return;
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.activeTab.set(newTab);
      this.isTransitioning.set(false);
    }, 120);
  }

  // Password Generator
  generatePassword(): void {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let validChars = chars;
    if (this.includeNumbers()) validChars += numbers;
    if (this.includeSymbols()) validChars += symbols;

    let generated = '';
    const array = new Uint32Array(this.passLength());
    crypto.getRandomValues(array);

    for (let i = 0; i < this.passLength(); i++) {
      generated += validChars[array[i] % validChars.length];
    }

    this.passwordForm.patchValue({ password: generated });
  }

  // Form Submissions
  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      this.savePassword.emit(this.passwordForm.value);
      this.resetAndClose();
    }
  }

  onSubmitText(): void {
    if (this.textForm.valid) {
      this.saveText.emit(this.textForm.value);
      this.resetAndClose();
    }
  }

  onClose(): void {
    if (this.isClosing()) return;

    // Trigger exit animation class
    this.isClosing.set(true);

    // Wait for the exit transition (200ms) before emitting close
    setTimeout(() => {
      this.resetAndClose();
      this.close.emit();
    }, 200);
  }

  private resetAndClose(): void {
    this.passwordForm.reset({ category: 'General' });
    this.textForm.reset({ category: 'General' });
    this.showGenerator.set(false);
    this.isTransitioning.set(false);
    this.isClosing.set(false);
    this.close.emit();
  }
}
