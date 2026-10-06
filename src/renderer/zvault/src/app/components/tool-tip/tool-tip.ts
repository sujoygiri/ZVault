import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tool-tip',
  imports: [CommonModule],
  templateUrl: './tool-tip.html',
  styleUrl: './tool-tip.css',
})
export class ToolTip {
  text = input.required<string>();
  position = input<TooltipPosition>('top');
  backgroundClass = input<
    | 'bg-slate-900'
    | 'bg-blue-600'
    | 'bg-green-600'
    | 'bg-red-600'
    | 'bg-amber-500'
  >('bg-slate-900');

  readonly isVisible = signal(false);
  readonly isTop = computed(() => this.position() === 'top');
  readonly isBottom = computed(() => this.position() === 'bottom');
  readonly isLeft = computed(() => this.position() === 'left');
  readonly isRight = computed(() => this.position() === 'right');

  show(): void {
    this.isVisible.set(true);
  }

  hide(): void {
    this.isVisible.set(false);
  }

}
