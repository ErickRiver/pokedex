import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../theme/theme.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  private readonly theme = inject(ThemeService);

  readonly currentTheme = this.theme.theme;

  toggleTheme(): void {
    this.theme.toggleTheme();
  }
}
