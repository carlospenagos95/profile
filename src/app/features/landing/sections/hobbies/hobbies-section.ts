import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Hobby } from '../../../../core/models/hobby';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';

@Component({
  selector: 'app-hobbies-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading],
  templateUrl: './hobbies-section.html',
  styleUrl: './hobbies-section.scss',
})
export class HobbiesSection {
  readonly hobbies = input.required<readonly Hobby[]>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string | null>(null);
}
