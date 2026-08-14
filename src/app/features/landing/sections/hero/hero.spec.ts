import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from './hero';
import { SiteProfile } from '../../../../core/models/site-profile';

const PROFILE: SiteProfile = {
  name: 'Nombre Apellido',
  headline: 'Angular Engineer',
  valueProposition: 'Construyo interfaces rápidas y accesibles.',
  bio: ['Primer párrafo.', 'Segundo párrafo.'],
  location: 'Bogotá, Colombia',
};

describe('Hero', () => {
  let fixture: ComponentFixture<Hero>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Hero] }).compileComponents();
    fixture = TestBed.createComponent(Hero);
    fixture.componentRef.setInput('profile', PROFILE);
    fixture.componentRef.setInput('ctaPrimaryLabel', 'Hablemos');
    fixture.componentRef.setInput('ctaSecondaryLabel', 'Ver servicios');
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('usa el nombre como único h1 de la página', () => {
    const headings = element.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain(PROFILE.name);
    expect(element.querySelector('section')?.getAttribute('aria-labelledby')).toBe('hero-titulo');
    expect(headings[0].id).toBe('hero-titulo');
  });

  it('enlaza los dos CTA a secciones existentes', () => {
    const ctas = Array.from(element.querySelectorAll<HTMLAnchorElement>('.hero__actions a'));
    expect(ctas.map((cta) => cta.getAttribute('href'))).toEqual(['#contacto', '#servicios']);
    expect(ctas[0].textContent).toContain('Hablemos');
    expect(ctas[1].textContent).toContain('Ver servicios');
  });

  it('renderiza cada párrafo de la bio', () => {
    expect(element.querySelectorAll('.hero__bio p').length).toBe(PROFILE.bio.length);
  });
});
