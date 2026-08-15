# Landing page personal

Portfolio personal de una sola página, construido con Angular 22 y prerenderizado a HTML
estático. Sin dependencias de runtime más allá de Angular.

## Requisitos

- Node.js 20, 22 o 24 (probado en 24.18)
- npm 9+

## Instalación

```bash
npm ci
```

## Desarrollo

```bash
npm start          # http://localhost:4200 con recarga en caliente
```

## Comandos

| Comando                | Qué hace                                                   |
| ---------------------- | ---------------------------------------------------------- |
| `npm start`            | Servidor de desarrollo                                     |
| `npm run build`        | Build de producción + prerender (salida estática)          |
| `npm test`             | Vitest: tests unitarios y de componente                    |
| `npm run lint`         | ESLint sobre TypeScript y plantillas (incluye reglas a11y) |
| `npm run format`       | Prettier sobre todo el repositorio                         |
| `npm run format:check` | Comprueba formato sin escribir                             |
| `npm run verify`       | `lint` + `test` + `build`                                  |

## Editar el contenido

**Todo el texto del sitio vive en `src/app/content/`.** No hace falta tocar ningún componente:

| Archivo                   | Contenido                                           |
| ------------------------- | --------------------------------------------------- |
| `profile.content.ts`      | Nombre, titular, propuesta de valor, bio, ubicación |
| `services.content.ts`     | Servicios ofrecidos                                 |
| `technologies.content.ts` | Tecnologías agrupadas por categoría y su nivel      |
| `hobbies.content.ts`      | Hobbies e intereses                                 |
| `social.content.ts`       | Email y perfiles (también alimentan el JSON-LD)     |
| `site.content.ts`         | Secciones de la navegación, metadatos SEO y copys   |

El contenido procede de `docs/assets/CV---Carlos-Penagos.pdf`. El dominio de producción
(`https://profile.carlos-po.dev`) aparece en `site.content.ts`, `public/robots.txt` y
`public/sitemap.xml`: cambiarlo exige tocar los tres.

Las imágenes de `public/` (`avatar.webp`, `avatar.jpg`, `og-image.jpg`) se generaron desde
`docs/assets/fotoperfil.jpeg` con `sharp`: recorte cuadrado 640×640 para el avatar y 1200×630
para Open Graph.

Los iconos disponibles están en la unión `IconName` (`src/app/core/models/icon-name.ts`);
usar uno que no exista es un error de compilación. Para añadir otro, amplía la unión y añade
su trazo en `src/app/shared/ui/icon/icon.ts`.

## Despliegue

Producción: <https://profile.carlos-po.dev> — imagen Docker en un servidor propio, detrás de
Traefik. Detalles en [`docs/adr/0005-despliegue-docker-ghcr-traefik.md`](./docs/adr/0005-despliegue-docker-ghcr-traefik.md).

### Automático

`.github/workflows/deploy.yml` se dispara con cada push a `main` (o a mano desde la pestaña
Actions) y encadena:

1. `verify`: `format:check`, `lint`, `test`, `build`.
2. `build-push`: construye la imagen y la publica en `ghcr.io/<owner>/<repo>` con dos tags —
   el SHA corto del commit y `latest`.
3. `deploy`: copia `docker-compose.yml` al servidor por SSH, hace `docker compose pull` y
   `up -d` con el tag del commit, y comprueba que el sitio responde 200.

**Secrets necesarios** (Settings → Secrets and variables → Actions):

| Secret            | Contenido                                                          |
| ----------------- | ------------------------------------------------------------------ |
| `SSH_HOST`        | Host o IP del servidor                                             |
| `SSH_USER`        | Usuario del despliegue                                             |
| `SSH_KEY`         | Clave privada completa (la pública va en `~/.ssh/authorized_keys`) |
| `SSH_KNOWN_HOSTS` | Salida de `ssh-keyscan -H tu-servidor`                             |
| `DEPLOY_PATH`     | Directorio del servidor donde vive el `docker-compose.yml`         |
| `SSH_PORT`        | Solo si el puerto no es 22                                         |

GHCR se autentica con el `GITHUB_TOKEN` del propio workflow; no hace falta un PAT mientras el
paquete pertenezca al mismo repositorio.

### Requisitos en el servidor

Docker con el plugin Compose, Traefik corriendo y una red externa (por defecto `traefik`).
Si tu instalación usa otros nombres, ajústalos por entorno sin tocar el compose:
`TRAEFIK_NETWORK`, `TRAEFIK_ENTRYPOINT`, `TRAEFIK_CERTRESOLVER`.

### Manual

```bash
docker build -t personal-landing .
docker run --rm -p 8080:80 personal-landing     # http://localhost:8080
```

### Salida estática sin Docker

`npm run build` deja HTML prerenderizado en `dist/personal-landing/browser`, servible tal cual:

```bash
npx http-server dist/personal-landing/browser -p 4300
```

## Arquitectura

```
src/app/
├── core/models/       modelos del dominio (readonly, sin clases)
├── core/services/     seo.service.ts · active-section.service.ts
├── content/           todo el texto del sitio, tipado
├── layout/            header/ · footer/
├── features/landing/  landing-page + sections/ (hero, services, technologies, hobbies, contact)
└── shared/            ui/ (icon, section-heading) · directives/ (reveal-on-scroll)
```

- Estructura plana a propósito: no hay backend, así que no hay capas
  domain/application/infrastructure que inventar. Ver `docs/adr/0001-arquitectura-pragmatica.md`.
- `LandingPage` y `App` son los únicos que leen el contenido; las secciones lo reciben por
  `input()`.
- Toda API de navegador se protege con `isPlatformBrowser` o `afterNextRender`: cualquier
  acceso directo a `window` rompería el prerender.

Decisiones documentadas en [`docs/adr/`](./docs/adr).
