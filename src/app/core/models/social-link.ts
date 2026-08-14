import { IconName } from './icon-name';

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  /** URL absoluta (o `mailto:`). Se usa también en `sameAs` del JSON-LD. */
  readonly href: string;
  readonly icon: IconName;
  /** Texto mostrado bajo la etiqueta: el handle, el email, etc. */
  readonly handle: string;
}
