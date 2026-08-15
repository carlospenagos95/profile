import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Icon } from '../../../../shared/ui/icon/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading/section-heading';
import { SocialLink } from '../../../../core/models/social-link';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  readonly links = input.required<readonly SocialLink[]>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string | null>(null);

  /** `mailto:` abre el cliente de correo en la misma pestaña; el resto, en una nueva. */
  isExternal(link: SocialLink): boolean {
    return link.href.startsWith('http');
  }
}
