import { DOCUMENT, DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Resalta en la navegación la sección visible. Toda la lógica depende de
 * `IntersectionObserver`, así que solo arranca en navegador: durante el prerender
 * el estado inicial (`null`) es válido y no se pinta ningún enlace como activo.
 */
@Injectable({ providedIn: 'root' })
export class ActiveSectionService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly activeIdState = signal<string | null>(null);
  private observer: IntersectionObserver | null = null;

  /** Id de la sección visible, o `null` si aún no se ha determinado. */
  readonly activeId = this.activeIdState.asReadonly();

  constructor() {
    inject(DestroyRef).onDestroy(() => this.disconnect());
  }

  /** Observa los `<section>` cuyos ids se pasen. Llamar tras el primer render. */
  observe(ids: readonly string[]): void {
    if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.disconnect();
    // La banda central del viewport decide cuál es "la sección actual": evita que
    // dos secciones compitan mientras entran y salen por los bordes.
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeIdState.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    for (const id of ids) {
      const element = this.document.getElementById(id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
