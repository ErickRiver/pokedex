import { Injectable, inject, signal } from '@angular/core';
import { StorageKeys } from '../../shared/constants';
import { ThemeMode } from '../../shared/models';
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject(StorageService);
  readonly theme = signal<ThemeMode>('light');

  constructor() {
    const stored = this.storage.get<ThemeMode>(StorageKeys.theme);
    if (stored) {
      this.applyTheme(stored);
    }
  }

  setTheme(mode: ThemeMode): void {
    this.applyTheme(mode);
    this.storage.set(StorageKeys.theme, mode);
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    document.documentElement.setAttribute('data-theme', mode);
  }
}
