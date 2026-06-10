import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { GIFS } from '../../constants';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './loading-state.component.html',
  styleUrl: './loading-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingStateComponent {
  readonly GIFS = GIFS;
}
