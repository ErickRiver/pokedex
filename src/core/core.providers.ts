import { ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { API_BASE_URL } from './http/api-base-url.token';
import { apiErrorInterceptor } from './http/api-error.interceptor';
import { GlobalErrorHandler } from './error/global-error.handler';
import { TranslationService } from './i18n/translation.service';
import { DEFAULT_LANGUAGE } from './i18n/translation.token';

export function provideCore() {
  return [
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    { provide: DEFAULT_LANGUAGE, useValue: 'en' as const },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (translation: TranslationService) => () => translation.init(),
      deps: [TranslationService],
    },
  ];
}
