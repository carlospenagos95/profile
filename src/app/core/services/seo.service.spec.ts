import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

import { SeoInput, SeoService } from './seo.service';

const INPUT: SeoInput = {
  meta: {
    url: 'https://ejemplo.dev',
    title: 'Nombre Apellido — Angular Engineer',
    description: 'Descripción para buscadores.',
    locale: 'es_ES',
    ogImage: '/og-image.png',
  },
  profile: {
    name: 'Nombre Apellido',
    headline: 'Angular Engineer',
    valueProposition: 'Interfaces rápidas y accesibles.',
    bio: ['Párrafo.'],
    location: 'Bogotá, Colombia',
  },
  socialLinks: [
    { id: 'email', label: 'Email', href: 'mailto:hola@ejemplo.dev', handle: 'hola', icon: 'mail' },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/ejemplo',
      handle: '@ejemplo',
      icon: 'github',
    },
  ],
  technologyGroups: [
    {
      id: 'frontend',
      label: 'Frontend',
      icon: 'code',
      items: [{ name: 'Angular', level: 'core' }],
    },
  ],
};

describe('SeoService', () => {
  beforeEach(() => {
    document.head.querySelector('#ld-person')?.remove();
    document.head.querySelector('link[rel="canonical"]')?.remove();
    TestBed.inject(SeoService).apply(INPUT);
  });

  it('fija título, descripción y canonical', () => {
    expect(TestBed.inject(Title).getTitle()).toBe(INPUT.meta.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      INPUT.meta.description,
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://ejemplo.dev',
    );
  });

  it('publica Open Graph y Twitter con la imagen absoluta', () => {
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      INPUT.meta.title,
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://ejemplo.dev/og-image.png',
    );
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image',
    );
  });

  it('genera un JSON-LD Person derivado del contenido', () => {
    const script = document.querySelector('script#ld-person');
    expect(script?.getAttribute('type')).toBe('application/ld+json');

    const person = JSON.parse(script?.textContent ?? '{}') as Record<string, unknown>;
    expect(person['@type']).toBe('Person');
    expect(person['name']).toBe('Nombre Apellido');
    expect(person['jobTitle']).toBe('Angular Engineer');
    // `sameAs` solo admite URLs: el mailto queda fuera.
    expect(person['sameAs']).toEqual(['https://github.com/ejemplo']);
    expect(person['knowsAbout']).toEqual(['Angular']);
  });

  it('no duplica el canonical ni el JSON-LD al reaplicarse', () => {
    TestBed.inject(SeoService).apply(INPUT);

    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.querySelectorAll('script#ld-person').length).toBe(1);
  });
});
