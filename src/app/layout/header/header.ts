import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';

import { ActiveSectionService } from '../../core/services/active-section.service';
import { SectionLink } from '../../core/models/section';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly sections = input.required<readonly SectionLink[]>();
  /** Texto de marca: el nombre, o unas iniciales si el nombre es largo. */
  readonly brand = input.required<string>();

  private readonly activeSection = inject(ActiveSectionService);
  private readonly menuOpenState = signal(false);

  readonly menuOpen = this.menuOpenState.asReadonly();
  readonly activeId = this.activeSection.activeId;

  readonly menuLabel = computed(() => (this.menuOpen() ? 'Cerrar menú' : 'Abrir menú'));

  toggleMenu(): void {
    this.menuOpenState.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpenState.set(false);
  }
}
