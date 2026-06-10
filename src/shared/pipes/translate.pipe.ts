import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';

@Pipe({ name: 'translate', standalone: true, pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly translation = inject(TranslationService);

  transform(key: string): string {
    // Re-run when language or dictionary revision changes (pipe is impure).
    this.translation.language();
    this.translation.revision();
    return this.translation.translate(key);
  }
}
