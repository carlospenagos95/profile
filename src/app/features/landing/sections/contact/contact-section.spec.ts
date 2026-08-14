import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSection } from './contact-section';
import { SocialLink } from '../../../../core/models/social-link';

const LINKS: readonly SocialLink[] = [
  { id: 'email', label: 'Email', href: 'mailto:hola@ejemplo.dev', handle: 'hola', icon: 'mail' },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/ejemplo',
    handle: '@ejemplo',
    icon: 'github',
  },
];

describe('ContactSection', () => {
  let fixture: ComponentFixture<ContactSection>;
  let anchors: HTMLAnchorElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactSection] }).compileComponents();
    fixture = TestBed.createComponent(ContactSection);
    fixture.componentRef.setInput('links', LINKS);
    fixture.componentRef.setInput('eyebrow', 'Contacto');
    fixture.componentRef.setInput('title', 'Hablemos');
    await fixture.whenStable();
    anchors = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.contact__link'),
    );
  });

  it('renderiza un enlace por canal', () => {
    expect(anchors.map((anchor) => anchor.getAttribute('href'))).toEqual([
      'mailto:hola@ejemplo.dev',
      'https://github.com/ejemplo',
    ]);
  });

  it('protege los enlaces externos y deja mailto en la misma pestaña', () => {
    const [email, github] = anchors;
    expect(email.getAttribute('target')).toBeNull();
    expect(email.getAttribute('rel')).toBeNull();
    expect(github.getAttribute('target')).toBe('_blank');
    expect(github.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
