import { SiteProfile } from '../core/models/site-profile';

/** Datos tomados de `docs/assets/CV---Carlos-Penagos.pdf`. */
export const PROFILE: SiteProfile = {
  name: 'Carlos Andrés Penagos',
  headline: 'Full Stack Developer · .NET Core y Angular',
  valueProposition:
    'Construyo APIs REST robustas y aplicaciones web de alto rendimiento, con despliegues automatizados y bases de datos que aguantan.',
  bio: [
    'Desarrollador de software con 5 años de experiencia creando APIs REST en .NET Core, manteniendo sitios web en Angular, React y Blazor, y gestionando infraestructura en la nube.',
    'Trabajo con principios SOLID, TDD y DDD sobre arquitecturas de microservicios, y automatizo el despliegue con pipelines de CI/CD en Azure DevOps.',
    'Ingeniero industrial y especialista en bases de datos por la UPTC. Liderazgo técnico, comunicación efectiva y resolución de problemas son mis pilares; me mueve el aprendizaje continuo.',
  ],
  location: 'Chocontá, Colombia',
  avatar: {
    src: '/avatar.webp',
    alt: 'Carlos Andrés Penagos sonriendo al aire libre, en una plaza con palmeras',
    width: 640,
    height: 640,
  },
};
