import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Toast, ToastItemState, ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts',
  imports: [CommonModule],
  templateUrl: './toasts.html',
  styleUrl: './toasts.css',
})
export class Toasts {

  private cdr = inject(ChangeDetectorRef);

  private toastStates = new Map<string, ToastItemState>();

  constructor (protected toastService: ToastService) {
    effect(() => {
      const activeToasts = this.toastService.toasts();

      activeToasts.forEach((toast) => {
        if (toast.duration && toast.duration > 0 && !this.toastStates.has(toast.id)) {
          this.initTimer(toast);
        }
      });

      this.toastStates.forEach((_, id) => {
        if (!activeToasts.some((t) => t.id === id)) {
          this.clearTimer(id);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.toastStates.forEach((_, id) => this.clearTimer(id));
  }

  getProgress(id: string): number {
    return this.toastStates.get(id)?.progress ?? 100;
  }

  pauseTimer(id: string): void {
    const state = this.toastStates.get(id);
    if (state && !state.isPaused) {
      state.isPaused = true;
      if (state.animFrameId) {
        cancelAnimationFrame(state.animFrameId);
      }
    }
  }

  resumeTimer(id: string): void {
    const state = this.toastStates.get(id);
    if (state && state.isPaused) {
      state.isPaused = false;
      state.lastTickTime = performance.now();
      this.runAnimationLoop(id);
    }
  }

  handleAction(toast: Toast): void {
    if (toast.action?.onClick) {
      toast.action.onClick();
    }
    this.dismiss(toast.id);
  }

  dismiss(id: string): void {
    this.clearTimer(id);
    this.toastService.remove(id);
  }

  private initTimer(toast: Toast): void {
    const totalDuration = toast.duration || 5000;

    const state: ToastItemState = {
      progress: 100,
      remainingTime: totalDuration,
      isPaused: false,
      lastTickTime: performance.now()
    };

    this.toastStates.set(toast.id, state);
    this.runAnimationLoop(toast.id);
  }

  private runAnimationLoop(id: string): void {
    const state = this.toastStates.get(id);
    const toast = this.toastService.toasts().find((t) => t.id === id);

    if (!state || !toast || state.isPaused) return;

    const totalDuration = toast.duration || 5000;

    const tick = (now: number) => {
      if (state.isPaused) return;

      const delta = now - state.lastTickTime;
      state.lastTickTime = now;
      state.remainingTime -= delta;

      state.progress = Math.max(0, (state.remainingTime / totalDuration) * 100);

      // Trigger Angular change detection for smooth rendering
      this.cdr.detectChanges();

      if (state.remainingTime <= 0) {
        this.dismiss(id);
      } else {
        state.animFrameId = requestAnimationFrame(tick);
      }
    };

    state.animFrameId = requestAnimationFrame(tick);
  }

  private clearTimer(id: string): void {
    const state = this.toastStates.get(id);
    if (state?.animFrameId) {
      cancelAnimationFrame(state.animFrameId);
    }
    this.toastStates.delete(id);
  }
}
