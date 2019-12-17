import { Injectable, TemplateRef } from '@angular/core';

export enum ToastType {
  Info = 'info',
  Warn = 'warn'
}

export interface ToastOptions {
  type: ToastType;
  delay?: number;
}

export interface Toast extends ToastOptions {
  textOrTpl: string | TemplateRef<any>;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = { type: ToastType.Info }) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
