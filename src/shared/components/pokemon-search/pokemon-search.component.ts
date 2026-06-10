import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSearchComponent {
  readonly placeholderKey = input<string>('pokemon.search.placeholder');
  readonly search = output<string>();

  query = '';

  onSearch(): void {
    this.search.emit(this.query.trim());
  }
}
