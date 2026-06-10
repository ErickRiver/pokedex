import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslationService } from '../../i18n/translation.service';
import { PokemonTypeThemeService } from '../../theme/pokemon-type-theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  protected readonly typeTheme = inject(PokemonTypeThemeService);

  /** Subscribed in template so OnPush views refresh after language change. */
  protected readonly i18nRevision = inject(TranslationService).revision;

  protected readonly layoutBackground = computed(() =>
    this.typeTheme.getLayoutBackground(this.typeTheme.primaryType()),
  );
}
