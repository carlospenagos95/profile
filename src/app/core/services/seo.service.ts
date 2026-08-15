import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SiteMeta } from '../models/site-meta';
import { SiteProfile } from '../models/site-profile';
import { SocialLink } from '../models/social-link';
import { TechnologyGroup } from '../models/technology';

export interface SeoInput {
  readonly meta: SiteMeta;
  readonly profile: SiteProfile;
  readonly socialLinks: readonly SocialLink[];
  readonly technologyGroups: readonly TechnologyGroup[];
}

/**
 * Centraliza los metadatos. Se ejecuta también durante el prerender, así que el HTML
 * estático ya sale con title, description, Open Graph y JSON-LD dentro.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  apply(input: SeoInput): void {
    const { meta, profile } = input;
    const canonical = meta.url;
    const image = `${meta.url}${meta.ogImage}`;

    this.titleService.setTitle(meta.title);
    this.metaService.updateTag({ name: 'description', content: meta.description });
    this.metaService.updateTag({ name: 'author', content: profile.name });

    this.metaService.updateTag({ property: 'og:type', content: 'profile' });
    this.metaService.updateTag({ property: 'og:site_name', content: profile.name });
    this.metaService.updateTag({ property: 'og:title', content: meta.title });
    this.metaService.updateTag({ property: 'og:description', content: meta.description });
    this.metaService.updateTag({ property: 'og:url', content: canonical });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:locale', content: meta.locale });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: meta.title });
    this.metaService.updateTag({ name: 'twitter:description', content: meta.description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(canonical);
    this.setPersonJsonLd(input);
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }
    link.href = href;
  }

  /** Structured data `Person`: se deriva del mismo contenido que pinta la página. */
  private setPersonJsonLd({ meta, profile, socialLinks, technologyGroups }: SeoInput): void {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.headline,
      description: meta.description,
      url: meta.url,
      image: `${meta.url}${meta.ogImage}`,
      sameAs: socialLinks
        .filter((link) => link.href.startsWith('https://'))
        .map((link) => link.href),
      knowsAbout: technologyGroups.flatMap((group) => group.items.map((item) => item.name)),
      ...(profile.location
        ? { address: { '@type': 'PostalAddress', name: profile.location } }
        : {}),
    };

    const head = this.document.head;
    let script = head.querySelector<HTMLScriptElement>('script#ld-person');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'ld-person';
      script.type = 'application/ld+json';
      head.appendChild(script);
    }
    // `textContent` (no innerHTML): el navegador nunca interpreta el contenido como markup.
    script.textContent = JSON.stringify(person);
  }
}
