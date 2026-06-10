import { InjectionToken } from '@angular/core';
import { AppLanguage } from '../../shared/models';

export const DEFAULT_LANGUAGE = new InjectionToken<AppLanguage>('DEFAULT_LANGUAGE');
