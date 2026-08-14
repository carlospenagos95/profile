import { SocialLink } from '../core/models/social-link';

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:carlos.penagos.software.95@gmail.com',
    handle: 'carlos.penagos.software.95@gmail.com',
    icon: 'mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/carlospenagos95',
    handle: '@carlospenagos95',
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/carlospenagos95',
    handle: 'carlospenagos95',
    icon: 'linkedin',
  },
  {
    id: 'telefono',
    label: 'Teléfono',
    href: 'tel:+573105716714',
    handle: '+57 310 571 6714',
    icon: 'phone',
  },
  {
    id: 'web',
    label: 'Sitio personal',
    href: 'https://home.carlos-po.dev/',
    handle: 'home.carlos-po.dev',
    icon: 'globe',
  },
];
