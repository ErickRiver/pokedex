import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IMAGES } from '../../constants';

@Component({
  selector: 'app-empty-state',
  standalone: true,  
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly IMAGES = IMAGES;
  readonly error = input<unknown>();
}
