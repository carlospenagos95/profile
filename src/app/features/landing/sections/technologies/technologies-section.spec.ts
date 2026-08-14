import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesSection } from './technologies-section';
import { TechnologyGroup, TechnologyLevel } from '../../../../core/models/technology';

const GROUPS: readonly TechnologyGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'code',
    items: [
      { name: 'Angular', level: 'core', note: 'A diario' },
      { name: 'TypeScript', level: 'core' },
    ],
  },
  { id: 'cloud', label: 'Cloud', icon: 'cloud', items: [{ name: 'Azure', level: 'familiar' }] },
];

const LABELS: Readonly<Record<TechnologyLevel, string>> = {
  core: 'Día a día',
  proficient: 'Sólido',
  familiar: 'Familiarizado',
};

describe('TechnologiesSection', () => {
  let fixture: ComponentFixture<TechnologiesSection>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TechnologiesSection] }).compileComponents();
    fixture = TestBed.createComponent(TechnologiesSection);
    fixture.componentRef.setInput('groups', GROUPS);
    fixture.componentRef.setInput('levelLabels', LABELS);
    fixture.componentRef.setInput('eyebrow', 'Tecnologías');
    fixture.componentRef.setInput('title', 'Con qué trabajo');
    await fixture.whenStable();
    element = fixture.nativeElement as HTMLElement;
  });

  it('agrupa las tecnologías y las etiqueta con su grupo', () => {
    const groups = element.querySelectorAll('.group');
    expect(groups.length).toBe(GROUPS.length);
    expect(groups[0].getAttribute('aria-labelledby')).toBe('grupo-frontend');
    expect(element.querySelector('#grupo-frontend')?.textContent).toContain('Frontend');
  });

  it('lista todas las tecnologías con su nivel legible', () => {
    const items = element.querySelectorAll('.tech');
    expect(items.length).toBe(3);
    expect(items[0].querySelector('.tech__level')?.textContent?.trim()).toBe('Día a día');
    expect(items[2].querySelector('.tech__level')?.textContent?.trim()).toBe('Familiarizado');
  });

  it('muestra la nota solo cuando existe', () => {
    expect(element.querySelectorAll('.tech__note').length).toBe(1);
  });
});
