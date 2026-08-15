import { Service } from '../core/models/service';

/** Servicios derivados de la experiencia real del CV. */
export const SERVICES: readonly Service[] = [
  {
    id: 'apis-rest',
    title: 'APIs REST en .NET Core',
    description:
      'Diseño e implementación de APIs escalables aplicando SOLID, TDD y DDD, pensadas para mantenerse durante años sin degradarse.',
    icon: 'server',
  },
  {
    id: 'frontend',
    title: 'Aplicaciones web frontend',
    description:
      'Desarrollo y mantenimiento de sitios en Angular, React y Blazor, incluidos microfrontends con Module Federation.',
    icon: 'code',
  },
  {
    id: 'devops',
    title: 'CI/CD y despliegue',
    description:
      'Pipelines en Azure DevOps y contenerización con Docker para automatizar el despliegue y recortar los tiempos de entrega.',
    icon: 'cloud',
  },
  {
    id: 'bases-de-datos',
    title: 'Bases de datos',
    description:
      'Administración y optimización de MySQL y MongoDB: rendimiento de consultas e integridad de los datos.',
    icon: 'layers',
  },
  {
    id: 'automatizacion',
    title: 'Automatización y scraping',
    description:
      'Scripts en Python, alertas de monitoreo y extracción de datos con Selenium y Playwright.',
    icon: 'gauge',
  },
  {
    id: 'microservicios',
    title: 'Arquitectura de microservicios',
    description:
      'Comunicación entre servicios mediante eventos con RabbitMQ, con foco en desacoplar y aislar fallos.',
    icon: 'compass',
  },
];
