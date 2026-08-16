import { Directive, signal } from '@angular/core';


@Directive({
  selector: '[appToggleStateDirective]',
  exportAs: 'toggleState'
})
export class ToggleStateDirective {
  usernameVisibility = false;
  passwordVisibility = false;
  actionMenuVisibility = false;
  attachedData = signal<any>(null);

  constructor() {}

  toggleUsernameVisibility() {
    this.usernameVisibility = !this.usernameVisibility;
  }

  togglePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  toggleActionMenuVisibility(): void {
    this.actionMenuVisibility = !this.actionMenuVisibility;
  }

  reset() {
    this.usernameVisibility = false;
    this.passwordVisibility = false;
    this.actionMenuVisibility = false;
    this.attachedData.set(null);
  }
 
}
