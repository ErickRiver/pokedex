import { ApplicationRef, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ASSETS_BASE, StorageKeys } from '../../shared/constants';
import { AppLanguage } from '../../shared/models';
import { StorageService } from '../storage/storage.service';
import { DEFAULT_LANGUAGE } from './translation.token';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly appRef = inject(ApplicationRef);
  private readonly defaultLanguage =
    inject(DEFAULT_LANGUAGE, { optional: true }) ?? ('en' as AppLanguage);

  readonly language = signal<AppLanguage>(this.defaultLanguage);
  /** Bumped when dictionaries are ready; used by translate pipe and chart effects. */
  readonly revision = signal(0);

  private dictionaries: Partial<Record<AppLanguage, TranslationDictionary>> = {};

  constructor() {
    const stored = this.storage.get<AppLanguage>(StorageKeys.language);
    if (stored) {
      this.language.set(stored);
    }
  }

  async init(): Promise<void> {
    await this.loadDictionary(this.language());
    this.revision.update((v) => v + 1);
  }

  async setLanguage(lang: AppLanguage): Promise<void> {
    await this.loadDictionary(lang);
    this.language.set(lang);
    this.storage.set(StorageKeys.language, lang);
    this.revision.update((v) => v + 1);
    this.appRef.tick();
  }

  translate(key: string): string {
    const dict = this.dictionaries[this.language()];
    if (!dict) {
      return key;
    }
    const value = this.resolveKey(dict, key);
    return typeof value === 'string' ? value : key;
  }

  private async loadDictionary(lang: AppLanguage): Promise<void> {
    if (this.dictionaries[lang]) {
      return;
    }
    const url = `${ASSETS_BASE}/i18n/${lang}.json`;
    // #region agent log
    fetch('http://127.0.0.1:7635/ingest/607b135d-9afe-4540-a1ad-97314ea5a0cd',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'47a8d0'},body:JSON.stringify({sessionId:'47a8d0',location:'translation.service.ts:loadDictionary',message:'Loading i18n dictionary',data:{url,assetsBase:ASSETS_BASE,lang},timestamp:Date.now(),hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
    // #endregion
    const dict = await firstValueFrom(
      this.http.get<TranslationDictionary>(url),
    );
    // #region agent log
    fetch('http://127.0.0.1:7635/ingest/607b135d-9afe-4540-a1ad-97314ea5a0cd',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'47a8d0'},body:JSON.stringify({sessionId:'47a8d0',location:'translation.service.ts:loadDictionary',message:'i18n dictionary loaded',data:{url,lang,keyCount:Object.keys(dict).length},timestamp:Date.now(),hypothesisId:'A',runId:'post-fix'})}).catch(()=>{});
    // #endregion
    this.dictionaries[lang] = dict;
  }

  private resolveKey(
    dict: TranslationDictionary,
    key: string,
  ): string | TranslationDictionary | undefined {
    return key.split('.').reduce<string | TranslationDictionary | undefined>(
      (acc, part) => {
        if (acc && typeof acc === 'object' && part in acc) {
          return acc[part] as string | TranslationDictionary;
        }
        return undefined;
      },
      dict,
    );
  }
}
