import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  DestroyRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Aparición suave al entrar en el viewport.
 *
 * La clase `reveal` (que parte de opacidad 0) se añade **desde JavaScript**: así el HTML
 * prerenderizado se ve completo aunque el bundle falle o el usuario tenga JS desactivado.
 * Con `prefers-reduced-motion` ni siquiera se activa.
 */
@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScroll {
  private readonly element = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    let observer: IntersectionObserver | null = null;
    inject(DestroyRef).onDestroy(() => observer?.disconnect());

    afterNextRender(() => {
      if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      this.element.classList.add('reveal');
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal--visible');
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      );
      observer.observe(this.element);
    });
  }
}
