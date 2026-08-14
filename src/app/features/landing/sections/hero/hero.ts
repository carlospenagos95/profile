import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { Icon } from '../../../../shared/ui/icon/icon';
import { SiteProfile } from '../../../../core/models/site-profile';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly profile = input.required<SiteProfile>();
  readonly ctaPrimaryLabel = input.required<string>();
  readonly ctaSecondaryLabel = input.required<string>();
}
