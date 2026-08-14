import { SectionLink } from '../core/models/section';
import { SiteMeta } from '../core/models/site-meta';
import { HOBBIES } from './hobbies.content';
import { PROFILE } from './profile.content';
import { SERVICES } from './services.content';
import { SOCIAL_LINKS } from './social.content';
import { TECHNOLOGY_GROUPS } from './technologies.content';

/**
 * Secciones navegables. El `id` es literalmente el `id` del `<section>` en el DOM,
 * así que el header, el skip link y el observador de scroll comparten una sola fuente.
 */
export const SECTIONS: readonly SectionLink[] = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'contacto', label: 'Contacto' },
];

export const META: SiteMeta = {
  url: 'https://profile.carlos-po.dev',
  title: 'Carlos Andrés Penagos — Full Stack Developer',
  description:
    'Full Stack Developer con 5 años de experiencia en APIs REST con .NET Core, aplicaciones Angular y React, y despliegue automatizado en Azure.',
  locale: 'es_ES',
  ogImage: '/og-image.jpg',
};

/** Textos de cabecera de cada sección. Separados del markup a propósito. */
export const SECTION_COPY = {
  hero: {
    ctaPrimary: 'Hablemos',
    ctaSecondary: 'Ver servicios',
  },
  services: {
    eyebrow: 'Servicios',
    title: 'En qué puedo ayudarte',
    lead: 'Del backend a la base de datos y del pipeline al navegador: lo que hago a diario.',
  },
  technologies: {
    eyebrow: 'Tecnologías',
    title: 'Con qué trabajo',
    lead: 'Herramientas que he usado en producción, no una lista de deseos.',
  },
  hobbies: {
    eyebrow: 'Fuera del código',
    title: 'Qué hago cuando cierro el editor',
    lead: 'Balón, acordeones y caminos largos. Lo que me recarga entre despliegue y despliegue.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Hablemos',
    lead: '¿Tienes un proyecto o una vacante? Escríbeme y te respondo.',
  },
} as const;

/**
 * Única entrada de contenido para la aplicación. `LandingPage` es el solo componente
 * que la lee; el resto recibe datos por `input()`.
 */
export const SITE_CONTENT = {
  meta: META,
  profile: PROFILE,
  sections: SECTIONS,
  services: SERVICES,
  technologyGroups: TECHNOLOGY_GROUPS,
  hobbies: HOBBIES,
  socialLinks: SOCIAL_LINKS,
  copy: SECTION_COPY,
} as const;
