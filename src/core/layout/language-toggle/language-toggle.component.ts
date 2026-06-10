import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { AppLanguage } from '../../../shared/models';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-toggle.component.html',
  styleUrl: './language-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageToggleComponent {
  private readonly translation = inject(TranslationService);

  readonly currentLanguage = this.translation.language;

  readonly languageLabel = computed(() => this.currentLanguage().toUpperCase());

  async toggleLanguage(): Promise<void> {
    const nextLanguage: AppLanguage = this.currentLanguage() === 'en' ? 'es' : 'en';
    await this.translation.setLanguage(nextLanguage);
  }
}
