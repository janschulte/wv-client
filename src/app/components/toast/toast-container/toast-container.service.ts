import { Injectable, TemplateRef } from '@angular/core';

export interface ToastOptions {
  classname?: string;
  delay?: number;
}

export interface Toast extends ToastOptions {
  textOrTpl: string | TemplateRef<any>;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
