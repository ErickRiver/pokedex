import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonAbout } from '../../../../shared/models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pokemon-about',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pokemon-about.component.html',
  styleUrl: './pokemon-about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAboutComponent {
  readonly about = input<PokemonAbout | null>(null);
}
