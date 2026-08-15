import { SITE_CONTENT } from './site.content';

/**
 * El contenido es la parte del sitio que más manos toca y la que ningún compilador
 * revisa a fondo: estos tests protegen las invariantes que romperían la navegación,
 * los enlaces o el JSON-LD.
 */
describe('SITE_CONTENT', () => {
  const idsOf = (items: readonly { id: string }[]): string[] => items.map((item) => item.id);
  const expectUniqueIds = (items: readonly { id: string }[]): void => {
    const ids = idsOf(items);
    expect(new Set(ids).size).toBe(ids.length);
  };

  it('no repite ids dentro de cada colección', () => {
    expectUniqueIds(SITE_CONTENT.sections);
    expectUniqueIds(SITE_CONTENT.services);
    expectUniqueIds(SITE_CONTENT.hobbies);
    expectUniqueIds(SITE_CONTENT.socialLinks);
    expectUniqueIds(SITE_CONTENT.technologyGroups);
  });

  it('usa ids de sección aptos para anclas', () => {
    for (const section of SITE_CONTENT.sections) {
      expect(section.id).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(section.label.trim()).not.toBe('');
    }
  });

  it('enlaza solo a https, mailto o tel', () => {
    for (const link of SITE_CONTENT.socialLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:|tel:\+)/);
    }
  });

  it('define al menos un grupo de tecnologías, cada uno con elementos', () => {
    expect(SITE_CONTENT.technologyGroups.length).toBeGreaterThan(0);
    for (const group of SITE_CONTENT.technologyGroups) {
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it('no deja textos vacíos en los servicios ni en los hobbies', () => {
    for (const item of [...SITE_CONTENT.services, ...SITE_CONTENT.hobbies]) {
      expect(item.title.trim()).not.toBe('');
      expect(item.description.trim()).not.toBe('');
    }
  });
});
