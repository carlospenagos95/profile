import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Cabecera común de las secciones. Existe por reutilización real (5 usos) y porque
 * centraliza el vínculo `aria-labelledby` → `id` del título.
 */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="heading">
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h2 [id]="headingId()">{{ title() }}</h2>
      @if (lead(); as leadText) {
        <p class="lead">{{ leadText }}</p>
      }
    </div>
  `,
  styles: `
    .heading {
      margin-bottom: var(--space-10);
    }

    h2 {
      margin-bottom: var(--space-3);
    }
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string | null>(null);
  /** Id del `<h2>`; la sección lo referencia con `aria-labelledby`. */
  readonly headingId = input.required<string>();
}
