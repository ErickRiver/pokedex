import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { PokemonStat } from '../../../../shared/models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TranslationService } from '../../../../core/i18n/translation.service';

const STAT_ORDER = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
] as const;

const HIGHEST_STAT_COLOR = '#990000';
const LOWEST_STAT_COLOR = '#011F5B';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pokemon-stats.component.html',
  styleUrl: './pokemon-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonStatsComponent implements AfterViewInit, OnDestroy {
  readonly stats = input<PokemonStat[]>([]);
  readonly textPrimary = input('rgba(28, 28, 28, 0.7)');
  readonly textSecondary = input('rgba(28, 28, 28)');

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('radarCanvas');
  private chart: Chart<'radar'> | null = null;
  private viewReady = false;
  private readonly translate = inject(TranslationService);

  constructor() {
    effect(() => {
      this.stats();
      this.textPrimary();
      this.textSecondary();
      this.translate.language();
      this.translate.revision();
      if (this.viewReady) {
        this.renderChart();
      }
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart = null;
  }

  private renderChart(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) {
      return;
    }

    const { labels, values } = this.buildChartData(this.stats());
    if (!values.length) {
      this.chart?.destroy();
      this.chart = null;
      return;
    }

    const lowestValue: number = Math.min(...values);
    const highestValue: number = Math.max(...values);
    const colors = this.resolveChartColors(canvas);
    const pointLabelColor = this.buildPointLabelColorFn(
      values,
      lowestValue,
      highestValue,
      colors.label,
    );

    if (this.chart) {
      this.chart.data.labels = labels;
      const dataset = this.chart.data.datasets[0];
      dataset.data = values;
      dataset.backgroundColor = colors.fill;
      dataset.borderColor = colors.border;
      dataset.pointBackgroundColor = colors.border;
      const scale = this.chart.options.scales?.['r'];
      if (scale) {
        scale.pointLabels = { font: { size: 11 }, color: pointLabelColor };
        scale.grid = { ...scale.grid, color: colors.grid };
        scale.angleLines = { ...scale.angleLines, color: colors.grid };
      }
      this.chart.update();
      return;
    }

    this.chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'Base stats',
            data: values,
            backgroundColor: colors.fill,
            borderColor: colors.border,
            borderWidth: 2,
            pointBackgroundColor: colors.border,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 255,
            ticks: { stepSize: 51, font: { size: 11 }, color: colors.label, backdropColor: "transparent" },
            pointLabels: { font: { size: 11 }, color: pointLabelColor },
            grid: { color: colors.grid },
            angleLines: { color: colors.grid },
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  private buildPointLabelColorFn(
    values: number[],
    lowestValue: number,
    highestValue: number,
    defaultColor: string,
  ): (context: { index: number }) => string {
    return (context) => {
      if (lowestValue === highestValue) {
        return defaultColor;
      }

      const value = values[context.index];
      if (value === highestValue) {
        return HIGHEST_STAT_COLOR;
      }
      if (value === lowestValue) {
        return LOWEST_STAT_COLOR;
      }
      return defaultColor;
    };
  }

  private resolveChartColors(canvas: HTMLCanvasElement): {
    fill: string;
    border: string;
    label: string;
    grid: string;
  } {
    const border = this.resolveColor(this.textSecondary(), canvas);
    const label = this.resolveColor(this.textSecondary(), canvas);
    const grid = this.resolveColor(this.textPrimary(), canvas);
    return {
      fill: this.withAlpha(border, 0.35),
      border,
      label,
      grid,
    };
  }

  private resolveColor(color: string, canvas: HTMLCanvasElement): string {
    if (!color.startsWith('var(')) {
      return color;
    }

    const cssVar = color.slice(4, -1).trim();
    const host = canvas.closest('.pokemon-detail-page') ?? canvas.parentElement;
    const resolved =
      (host ? getComputedStyle(host).getPropertyValue(cssVar).trim() : '')
      || getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

    return resolved || color;
  }

  private withAlpha(color: string, alpha: number): string {
    const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})`;
    }
    return color;
  }

  private buildChartData(stats: PokemonStat[]): { labels: string[]; values: number[] } {
    const byName = new Map(stats.map((s) => [s.name, s.baseValue]));
    const labels: string[] = [];
    const values: number[] = [];

    for (const statName of STAT_ORDER) {
      const value = byName.get(statName);
      if (value !== undefined) {
        labels.push(this.formatStatLabel(statName));
        values.push(value);
      }
    }

    return { labels, values };
  }

  private formatStatLabel(statName: string): string {
    const labels: Record<string, string> = {
      hp: this.translate.translate('pokemon.stats.hp'),
      attack: this.translate.translate('pokemon.stats.attack'),
      defense: this.translate.translate('pokemon.stats.defense'),
      'special-attack': this.translate.translate('pokemon.stats.special-attack'),
      'special-defense': this.translate.translate('pokemon.stats.special-defense'),
      speed: this.translate.translate('pokemon.stats.speed'),
    };
    return labels[statName] ?? statName;
  }
}
