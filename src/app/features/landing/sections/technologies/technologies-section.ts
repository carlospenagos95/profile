import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../../../../shared/ui/icon/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { TechnologyGroup, TechnologyLevel } from '../../../../core/models/technology';

@Component({
  selector: 'app-technologies-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading],
  templateUrl: './technologies-section.html',
  styleUrl: './technologies-section.scss',
})
export class TechnologiesSection {
  readonly groups = input.required<readonly TechnologyGroup[]>();
  /** Etiqueta legible de cada nivel; llega desde el contenido, no se decide aquí. */
  readonly levelLabels = input.required<Readonly<Record<TechnologyLevel, string>>>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string | null>(null);
}
