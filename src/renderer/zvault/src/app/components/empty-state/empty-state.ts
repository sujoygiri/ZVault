import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { DataType } from '@zvault/shared-api';

@Component({
  selector: 'app-empty-state',
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  readonly entity = input.required<DataType>();
  readonly buttonText = input<string>('Create');
  readonly titleText = input<string>();
  readonly descriptionText = input<string>();

  dataAddAction = output<DataType>();

  readonly title = computed(
    () => this.titleText() ?? `No ${this.entity()} found`
  );

  readonly description = computed(
    () => this.descriptionText() ?? `You don't have any ${this.entity()} in your vault yet.`
  );

  handleDataEmit() {
    console.log('Hi');
    
    if(this.entity() === 'password'){
      this.dataAddAction.emit('password');
    } else {
      this.dataAddAction.emit('text');
    }
  }
}
