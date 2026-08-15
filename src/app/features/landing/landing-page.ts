import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';

import { ActiveSectionService } from '../../core/services/active-section.service';
import { ContactSection } from './sections/contact/contact-section';
import { Hero } from './sections/hero/hero';
import { HobbiesSection } from './sections/hobbies/hobbies-section';
import { LEVEL_LABELS } from '../../content/technologies.content';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll';
import { SITE_CONTENT } from '../../content/site.content';
import { SeoService } from '../../core/services/seo.service';
import { ServicesSection } from './sections/services/services-section';
import { TechnologiesSection } from './sections/technologies/technologies-section';

/**
 * Único componente que conoce el contenido: las secciones lo reciben por `input()`
 * y son intercambiables sin tocar nada más.
 */
@Component({
  selector: 'app-landing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero,
    ServicesSection,
    TechnologiesSection,
    HobbiesSection,
    ContactSection,
    RevealOnScroll,
  ],
  templateUrl: './landing-page.html',
})
export class LandingPage {
  protected readonly content = SITE_CONTENT;
  protected readonly levelLabels = LEVEL_LABELS;

  constructor() {
    inject(SeoService).apply({
      meta: this.content.meta,
      profile: this.content.profile,
      socialLinks: this.content.socialLinks,
      technologyGroups: this.content.technologyGroups,
    });

    const activeSection = inject(ActiveSectionService);
    // `afterNextRender` no se ejecuta en el prerender: el DOM ya existe cuando corre.
    afterNextRender(() => {
      activeSection.observe(['inicio', ...this.content.sections.map((section) => section.id)]);
    });
  }
}
