import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { ActiveSectionService } from '../../core/services/active-section.service';
import { Header } from './header';
import { SectionLink } from '../../core/models/section';

const SECTIONS: readonly SectionLink[] = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'contacto', label: 'Contacto' },
];

/** Doble del servicio: el `IntersectionObserver` real no aporta nada a estos tests. */
const activeId = signal<string | null>(null);
const activeSectionStub = {
  activeId: activeId.asReadonly(),
  observe: (): void => undefined,
} as unknown as ActiveSectionService;

describe('Header', () => {
  let fixture: ComponentFixture<Header>;

  const links = (): HTMLAnchorElement[] =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.header__link'));

  beforeEach(async () => {
    activeId.set(null);
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [{ provide: ActiveSectionService, useValue: activeSectionStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(Header);
    fixture.componentRef.setInput('sections', SECTIONS);
    fixture.componentRef.setInput('brand', 'Nombre Apellido');
    await fixture.whenStable();
  });

  it('renderiza un ancla por sección', () => {
    expect(links().map((link) => link.getAttribute('href'))).toEqual(['#servicios', '#contacto']);
  });

  it('marca la sección activa con aria-current', async () => {
    activeId.set('contacto');
    await fixture.whenStable();

    const [servicios, contacto] = links();
    expect(contacto.getAttribute('aria-current')).toBe('true');
    expect(servicios.getAttribute('aria-current')).toBeNull();
  });

  it('expone el estado del menú móvil al lector de pantalla', async () => {
    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.header__toggle',
    );
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(toggle?.getAttribute('aria-controls')).toBe('nav-principal');

    toggle?.click();
    await fixture.whenStable();

    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(toggle?.getAttribute('aria-label')).toBe('Cerrar menú');
  });

  it('cierra el menú al elegir una sección', async () => {
    const toggle = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>(
      '.header__toggle',
    );
    toggle?.click();
    await fixture.whenStable();

    links()[0].click();
    await fixture.whenStable();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });
});
