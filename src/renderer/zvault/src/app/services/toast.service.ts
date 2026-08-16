import { Injectable, signal } from '@angular/core';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // Duration in ms (0 = sticky/no progress bar)
  action?: ToastAction;
}

export interface ToastItemState {
  progress: number;
  remainingTime: number;
  isPaused: boolean;
  lastTickTime: number;
  animFrameId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>): void {
    const id = crypto.randomUUID();
    const duration = toast.duration ?? 5000;
    const newToast: Toast = { ...toast, id, duration };

    this.toasts.update((current) => [...current, newToast]);
  }

  info(title: string, message?: string, action?: ToastAction, duration?: number): void {
    this.show({ type: 'info', title, message, action, duration });
  }

  success(title: string, message?: string, action?: ToastAction, duration?: number): void {
    this.show({ type: 'success', title, message, action, duration });
  }

  warning(title: string, message?: string, action?: ToastAction, duration?: number): void {
    this.show({ type: 'warning', title, message, action, duration });
  }

  error(title: string, message?: string, action?: ToastAction, duration?: number): void {
    this.show({ type: 'error', title, message, action, duration });
  }

  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
