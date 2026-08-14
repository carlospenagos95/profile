import { TestBed } from '@angular/core/testing';

import { App } from './app';
import { SITE_CONTENT } from './content/site.content';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('monta el shell con landmarks y skip link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    const skipLink = element.querySelector<HTMLAnchorElement>('a.skip-link');
    expect(skipLink?.getAttribute('href')).toBe('#contenido');
    expect(element.querySelector('main')?.id).toBe('contenido');
    expect(element.querySelector('app-header')).not.toBeNull();
    expect(element.querySelector('app-footer')).not.toBeNull();
  });

  it('pasa el perfil al header y al footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.header__brand')?.textContent).toContain(
      SITE_CONTENT.profile.name,
    );
    expect(element.querySelector('.footer__copy')?.textContent).toContain(
      SITE_CONTENT.profile.name,
    );
  });
});
