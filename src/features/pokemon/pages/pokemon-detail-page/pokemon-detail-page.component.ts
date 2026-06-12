import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteToggleComponent } from '../../../../shared/components/favorite-toggle/favorite-toggle.component';
import { PokemonTypesComponent } from '../../../../shared/components/pokemon-types/pokemon-types.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ImgFallbackDirective } from '../../../../shared/directives/img-fallback.directive';
import { PokemonStatsComponent } from '../../components/pokemon-stats/pokemon-stats.component';
import { PokemonDetailFacadeService } from '../../services/pokemon-detail-facade.service';
import { EvolutionChainApi, PokemonApi, PokemonSpeciesApi } from '../../../../data/api/interfaces';
import {
  resolveOfficialArtworkUrl,
  resolveOfficialCryUrl,
} from '../../../../shared/helpers/pokemon-url.helper';
import {
  formatPokemonDisplayName,
  formatPokemonNameToJapanese,
} from '../../../../shared/helpers/pokemon-name.helper';
import { getPrimaryTypeName } from '../../../../shared/helpers/pokemon-type.helper';
import { PokemonTypeThemeService } from '../../../../core/theme/pokemon-type-theme.service';
import { DEFAULT_TYPE_THEME, POKEMON_TYPE_THEMES } from '../../../../shared/constants/pokemon-type-theme.const';
import { PokemonIdPipe } from '../../../../shared/pipes/pokemon-id.pipe';
import { PokemonHeightPipe } from '../../../../shared/pipes/pokemon-height.pipe';
import { PokemonWeightPipe } from '../../../../shared/pipes/pokemon-weight.pipe';
import { NgClass } from '@angular/common';
import { TranslationService } from '../../../../core/i18n/translation.service';
import {
  AppRoutes,
  POKEDEX_ID_WINDOW_RADIUS,
  POKEDEX_MAX_ID,
} from '../../../../shared/constants';
import { distinctUntilChanged, map } from 'rxjs';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PokemonEvolutionComponent } from '../../components/pokemon-evolution/pokemon-evolution.component';
import { PokemonAboutComponent } from '../../components/pokemon-about/pokemon-about.component';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [
    NgClass,
    FavoriteToggleComponent,
    PokemonTypesComponent,
    PokemonStatsComponent,
    PokemonEvolutionComponent,
    PokemonAboutComponent,
    TranslatePipe,
    ImgFallbackDirective,
    PokemonIdPipe,
    PokemonHeightPipe,
    PokemonWeightPipe,
    LoadingStateComponent,
    EmptyStateComponent,
  ],
  templateUrl: './pokemon-detail-page.component.html',
  styleUrl: './pokemon-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly facade = inject(PokemonDetailFacadeService);
  private readonly typeTheme = inject(PokemonTypeThemeService);
  private readonly translation = inject(TranslationService);
  private readonly idScrollRef = viewChild<ElementRef<HTMLDivElement>>('idScroll');
  private readonly pokemonImageRef = viewChild<ElementRef<HTMLImageElement>>('pokemonImage');
  readonly pokemon = signal<PokemonApi | null>(null);
  readonly pokemonSpecies = signal<PokemonSpeciesApi | null>(null);
  readonly evolutionChain = signal<EvolutionChainApi | null>(null);
  readonly tab = signal<'about' | 'stats' | 'evolution'>('about');
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly errorKey = signal<string | null>(null);
  readonly errorMessage = computed(() => {
    const key = this.errorKey();
    if (!key) {
      return '';
    }

    this.translation.language();
    this.translation.revision();
    return this.translation.translate(key);
  });
  readonly imageUrl = computed(() =>
    resolveOfficialArtworkUrl(this.pokemon()?.sprites ?? { front_default: '' }),
  );
  readonly cryUrl = computed(() =>
    resolveOfficialCryUrl(this.pokemon()?.cries ?? { latest: '', legacy: '' }),
  );
  readonly displayName = computed(() => formatPokemonDisplayName(this.pokemon()?.name ?? ''));
  readonly japaneseName = computed(() =>
    formatPokemonNameToJapanese(this.pokemonSpecies()?.names ?? []),
  );
  readonly primaryType = computed(() => getPrimaryTypeName(this.pokemon()?.types ?? []));

  readonly pokemonStats = computed(() =>
    (this.pokemon()?.stats ?? []).map((slot) => ({
      name: slot.stat.name,
      baseValue: slot.base_stat,
    })),
  );

  /** Type theme tokens — edit values in pokemon-type-theme.const.ts */
  readonly detailTheme = computed(() => {
    const type = this.primaryType();
    return type ? POKEMON_TYPE_THEMES[type] : DEFAULT_TYPE_THEME;
  });

  readonly detailTextStyle = computed(() => {
    const theme = this.detailTheme();
    return {
      '--detail-text-primary': theme.textPrimary,
      '--detail-text-secondary': theme.textSecondary,
    } as Record<string, string>;
  });

  readonly detailTypeClass = computed(() => {
    const type = this.primaryType();
    return type ? `pokemon-detail-page--${type}` : null;
  });

  readonly visiblePokedexIds = computed(() => {
    const currentId = this.pokemon()?.id;
    if (!currentId) {
      return [];
    }

    const start = Math.max(1, currentId - POKEDEX_ID_WINDOW_RADIUS);
    const end = Math.min(POKEDEX_MAX_ID, currentId + POKEDEX_ID_WINDOW_RADIUS);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  constructor() {
    effect(() => {
      this.typeTheme.setPrimaryType(this.primaryType());
    });

    effect(() => {
      const currentId = this.pokemon()?.id;

      if (!currentId) {
        return;
      }
      
      this.tab.set('about');

      queueMicrotask(() => {
        const container = this.idScrollRef()?.nativeElement;
        const active = container?.querySelector('.active');
        active?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('idOrName') ?? ''),
        distinctUntilChanged(),
      )
      .subscribe((idOrName) => {        
        this.loadPokemonDetail(idOrName);
        this.loadPokemonSpecies(idOrName);      
      });
  }

  ngOnDestroy(): void {
    this.typeTheme.clearPrimaryType();
  }

  setTab(tab: 'about' | 'stats' | 'evolution'): void {
    this.tab.set(tab);
  }

  scrollId(direction: -1 | 1): void {
    const el = this.idScrollRef()?.nativeElement;
    if (!el) {
      return;
    }

    const scrollAmount = Math.max(el.clientHeight * 0.6, 120);
    el.scrollBy({ top: direction * scrollAmount, behavior: 'smooth' });
  }

  navigateToId(id: number): void {
    this.router.navigateByUrl(AppRoutes.pokemonDetail(id));
  }

  playSound(): void {
    this.triggerImagePop();

    const audio = new Audio(this.cryUrl());
    audio.volume = 0.08;
    audio.play().catch(() => {
      // Autoplay policies may block playback outside a direct user gesture.
    });
  }

  /** Restarts click-scale by removing/re-adding the class after a forced reflow. */
  private triggerImagePop(): void {
    const el = this.pokemonImageRef()?.nativeElement;
    if (!el) {
      return;
    }

    el.classList.remove('pokemon-detail-page__image--pop');
    void el.offsetWidth;
    el.classList.add('pokemon-detail-page__image--pop');
  }

  private loadPokemonDetail(idOrName: string): void {
    this.loading.set(true);
    this.error.set(false);
    this.errorKey.set(null);

    this.facade.loadPokemonDetail(idOrName).subscribe({
      next: (pokemon: PokemonApi | null) => {
        this.pokemon.set(pokemon);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(true);
        this.errorKey.set(
          error.status === 404 ? 'pokemon.detail.unknown' : 'pokemon.detail.error',
        );
        this.loading.set(false);
      },
    });
  }

  private loadPokemonSpecies(idOrName: string): void {
    this.facade.loadPokemonSpecies(idOrName).subscribe({
      next: (species: PokemonSpeciesApi | null) => {
        this.pokemonSpecies.set(species);
        this.loadPokemonEvolution(this.pokemonSpecies()?.evolution_chain?.url ?? '');
      },
    });
  }

  private loadPokemonEvolution(url: string): void {
    this.facade.loadPokemonEvolution(url).subscribe({
      next: (evolution: EvolutionChainApi | null) => {
        this.evolutionChain.set(evolution);
      },
    });
  }
}
