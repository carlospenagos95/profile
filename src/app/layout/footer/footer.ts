import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../../shared/ui/icon/icon';
import { SocialLink } from '../../core/models/social-link';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly name = input.required<string>();
  readonly links = input.required<readonly SocialLink[]>();

  /** Se calcula una vez por render; el prerender fija el año de la build. */
  readonly year = new Date().getFullYear();
}
