import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageKeys } from '../../shared/constants';
import { StorageService } from '../storage/storage.service';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly storage = inject(StorageService);

  get<T>(key: string): T | null {
    if (!environment.enableCache) {
      return null;
    }
    const entry = this.storage.get<CacheEntry<T>>(`${StorageKeys.cachePrefix}${key}`);
    if (!entry) {
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.remove(key);
      return null;
    }
    return entry.data;
  }

  set<T>(key: string, data: T, ttlMs = environment.cacheTtlMs): void {
    if (!environment.enableCache) {
      return;
    }
    const entry: CacheEntry<T> = {
      data,
      expiresAt: Date.now() + ttlMs,
    };
    this.storage.set(`${StorageKeys.cachePrefix}${key}`, entry);
  }

  remove(key: string): void {
    this.storage.remove(`${StorageKeys.cachePrefix}${key}`);
  }
}
