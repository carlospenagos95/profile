import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconName } from '../../../core/models/icon-name';

/**
 * Registro de iconos. SVG inline propios (trazo 1.75, 24×24, `currentColor`):
 * cero dependencias, cero peticiones y color heredado del contexto.
 *
 * Son decorativos por defecto (`aria-hidden`): el significado siempre lo aporta el
 * texto adyacente. Si algún día un icono va solo, pásale `label` y pasa a `img` + `title`.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-icon' },
  styles: `
    .app-icon {
      display: inline-flex;
      flex: none;
    }

    svg {
      width: var(--icon-size, 1.25rem);
      height: var(--icon-size, 1.25rem);
    }
  `,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.aria-hidden]="label() ? null : true"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label()"
    >
      @switch (name()) {
        @case ('github') {
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M6 8.5v7M17 10.5v1a3 3 0 0 1-3 3H8" />
        }
        @case ('linkedin') {
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
        }
        @case ('mail') {
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
        }
        @case ('phone') {
          <path
            d="M7.5 3.5h-2A2 2 0 0 0 3.5 5.7C4 12.5 11.5 20 18.3 20.5a2 2 0 0 0 2.2-2v-2l-4-1.5-1.8 2a13.5 13.5 0 0 1-5.7-5.7l2-1.8-1.5-4Z"
          />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.6 2.6 15 0 18M12 3c-2.6 2.6-2.6 15 0 18" />
        }
        @case ('database') {
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        }
        @case ('terminal') {
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="m7 9 3 3-3 3M13 15h4" />
        }
        @case ('robot') {
          <rect x="4" y="8" width="16" height="11" rx="3" />
          <path d="M12 4.5V8M2.5 13H4m16 0h1.5" />
          <path d="M9 12.5v1.5M15 12.5v1.5" />
          <circle cx="12" cy="3.5" r="1" />
        }
        @case ('ball') {
          <circle cx="12" cy="12" r="9" />
          <path d="m12 7.5 4 2.9-1.5 4.6h-5L8 10.4 12 7.5Z" />
          <path d="M12 3v4.5M20.5 10.4 16 10.4M18 19l-3.5-4M6 19l3.5-4M3.5 10.4 8 10.4" />
        }
        @case ('accordion') {
          <rect x="2.5" y="5" width="4" height="14" rx="1.5" />
          <rect x="17.5" y="5" width="4" height="14" rx="1.5" />
          <path d="M6.5 6.5h11M6.5 9.5h11M6.5 12.5h11M6.5 15.5h11M6.5 18.5h11" />
        }
        @case ('guitar') {
          <path
            d="M11.5 12.5a4.5 4.5 0 1 0 3.2 3.2 3.6 3.6 0 0 1-3.2-3.2Z"
            transform="translate(-1 1)"
          />
          <path d="m13.5 12.5 5.5-5.5M17 4.5 19.5 7l1.5-1.5-2.5-2.5-1.5 1.5Z" />
        }
        @case ('plane') {
          <path d="M3 13.5 21 4l-4.5 17-4-6.5-6.5-1Z" />
        }
        @case ('footprints') {
          <path d="M6 5c1.7 0 2.5 1.2 2.5 3S8 12 6.5 12 4 10.8 4 9s.3-4 2-4Z" />
          <path d="M6.5 14h2v3a1 1 0 0 1-2 .2Z" />
          <path d="M17.5 8c1.7 0 2 2.2 2 4s-1 3-2.5 3S15 13.8 15 12s.8-4 2.5-4Z" />
          <path d="M16.5 17h2v3a1 1 0 0 1-2 .2Z" />
        }
        @case ('code') {
          <path d="m8 5-5 7 5 7M16 5l5 7-5 7" />
        }
        @case ('layers') {
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.5 12 21.2l8.5-4.7" />
        }
        @case ('server') {
          <rect x="3" y="4" width="18" height="7" rx="2" />
          <rect x="3" y="13" width="18" height="7" rx="2" />
          <path d="M7 7.5v.01M7 16.5v.01" />
        }
        @case ('cloud') {
          <path d="M7 18.5a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10.4a4 4 0 0 1-.6 8.1H7Z" />
        }
        @case ('gauge') {
          <path d="M4 17a9 9 0 1 1 16 0" />
          <path d="m12 14 4-4" />
          <circle cx="12" cy="15" r="1.5" />
        }
        @case ('accessibility') {
          <circle cx="12" cy="5" r="1.8" />
          <path d="M5 9h14M12 9v5m0 0-3 6m3-6 3 6" />
        }
        @case ('compass') {
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        }
        @case ('book') {
          <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5v-15Z" />
          <path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3" />
        }
        @case ('music') {
          <circle cx="6" cy="17.5" r="2.5" />
          <circle cx="17" cy="15.5" r="2.5" />
          <path d="M8.5 17.5V7l11-2v10.5" />
        }
        @case ('camera') {
          <path
            d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.4-2.2h7.8L17.3 7h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-9Z"
          />
          <circle cx="12" cy="13" r="3.5" />
        }
        @case ('mountain') {
          <path d="m2.5 19 6.5-11 4 6.2 2.5-3.7 6 8.5H2.5Z" />
        }
        @case ('gamepad') {
          <rect x="2.5" y="7" width="19" height="10" rx="4" />
          <path d="M7 10v4M5 12h4M15.5 11.5v.01M18 13.5v.01" />
        }
        @case ('arrow-right') {
          <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
        }
        @case ('external-link') {
          <path d="M14 4h6v6M20 4l-8.5 8.5" />
          <path
            d="M18 14.5v4A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4"
          />
        }
        @case ('menu') {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  /** Solo cuando el icono transmite información que ningún texto cercano cubre. */
  readonly label = input<string | null>(null);
}
