import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { PokemonSpeciesApi } from '../../../../data/api/interfaces';
import { SpeciesMapper } from '../../../../data/api/mappers/species.mapper';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { resolvePokemonGeneration } from '../../../../shared/helpers/pokemon-name.helper';
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
  readonly pokemonSpecies = input<PokemonSpeciesApi | null>(null);

  private readonly speciesMapper = inject(SpeciesMapper);
  private readonly translation = inject(TranslationService);
  private readonly versionsScrollRef = viewChild<ElementRef<HTMLDivElement>>('versionsScroll');

  /** Selected game version slug (e.g. "red"). Null = default entry for current language. */
  readonly selectedVersion = signal<{ version: string; flavor_text: string } | null>(null);

  readonly generation = computed(() =>
    resolvePokemonGeneration(this.pokemonSpecies()?.generation?.name ?? ''),
  );

  readonly versionDescriptions = computed(() => {
    this.translation.language();
    this.translation.revision();
    return this.speciesMapper.extractVersions(this.pokemonSpecies());
  });

  readonly versionDescription = computed(() => {
    this.translation.language();
    this.translation.revision();
    const species = this.pokemonSpecies();
    const { version } = this.selectedVersion() ?? {};
    return version
      ? this.speciesMapper.extractDescription(species, version)
      : this.speciesMapper.extractDescription(species);
  });

  constructor() {
    effect(() => {
      this.translation.language();
      this.translation.revision();
      const versions = this.versionDescriptions();
      this.selectedVersion.set(versions[0] ?? null);
    });
  }

  setVersionDescription(version: string, flavor_text: string): void {
    this.selectedVersion.set({ version, flavor_text });
  }

  /** Scrolls the version list horizontally (for users without a trackpad). */
  scrollVersions(direction: -1 | 1): void {
    const el = this.versionsScrollRef()?.nativeElement;
    if (!el) {
      return;
    }

    const scrollAmount = Math.max(el.clientWidth * 0.6, 120);
    el.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  // setPreviousVersion(): void {
  //   const versions = this.versionDescriptions();
  //   const currentIndex = versions.findIndex((v) => v.version === this.selectedVersion()?.version);
  //
  //   for (let i = currentIndex - 1; i >= 0; i--) {
  //     if (this.selectedVersion()?.flavor_text !== versions[i].flavor_text) {
  //       this.selectedVersion.set(versions[i]);
  //       return;
  //     }
  //   }
  //
  //   this.selectedVersion.set(versions[0]);
  // }
  //
  // setNextVersion(): void {
  //   const versions = this.versionDescriptions();
  //   const currentIndex = versions.findIndex((v) => v.version === this.selectedVersion()?.version);
  //
  //   for (let i = currentIndex + 1; i < versions.length; i++) {
  //     if (this.selectedVersion()?.flavor_text !== versions[i].flavor_text) {
  //       this.selectedVersion.set(versions[i]);
  //       return;
  //     }
  //   }
  // }
}
