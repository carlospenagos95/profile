import { TechnologyGroup, TechnologyLevel } from '../core/models/technology';

/** Tecnologías del CV, agrupadas por el uso que tienen en el trabajo real. */
export const TECHNOLOGY_GROUPS: readonly TechnologyGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'code',
    items: [
      {
        name: 'Angular',
        level: 'core',
        note: 'Angular 17 con PrimeNG y Angular 20 en microfrontends',
      },
      { name: 'React', level: 'proficient', note: 'Mantenimiento de aplicaciones en producción' },
      { name: 'Blazor', level: 'familiar' },
      { name: 'TypeScript', level: 'core' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'server',
    items: [
      { name: '.NET Core', level: 'core', note: 'APIs REST bajo SOLID, TDD y DDD' },
      { name: 'APIs REST', level: 'core' },
      { name: 'RabbitMQ', level: 'proficient', note: 'Eventos entre microservicios' },
      { name: 'Python', level: 'proficient', note: 'Automatización y alertas de monitoreo' },
    ],
  },
  {
    id: 'bases-de-datos',
    label: 'Bases de datos',
    icon: 'database',
    items: [
      { name: 'MongoDB', level: 'core', note: 'Optimización de rendimiento' },
      { name: 'MySQL', level: 'core' },
    ],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud y DevOps',
    icon: 'cloud',
    items: [
      { name: 'Azure DevOps', level: 'core', note: 'Pipelines de CI/CD' },
      { name: 'Azure', level: 'proficient' },
      { name: 'Docker', level: 'proficient', note: 'Contenerización de aplicaciones' },
      { name: 'CI/CD', level: 'core' },
    ],
  },
  {
    id: 'practicas',
    label: 'Prácticas y arquitectura',
    icon: 'compass',
    items: [
      { name: 'TDD', level: 'core' },
      { name: 'DDD', level: 'proficient' },
      { name: 'SOLID', level: 'core' },
      { name: 'Microservicios', level: 'proficient' },
    ],
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    icon: 'robot',
    items: [
      { name: 'Selenium', level: 'proficient' },
      { name: 'Playwright', level: 'proficient' },
      { name: 'Web scraping', level: 'proficient' },
    ],
  },
];

/** Etiquetas visibles de cada nivel. Centralizadas para no repetirlas en plantillas. */
export const LEVEL_LABELS: Readonly<Record<TechnologyLevel, string>> = {
  core: 'Día a día',
  proficient: 'Sólido',
  familiar: 'Familiarizado',
};
