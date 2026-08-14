# CLAUDE.md — personal-landing

Landing page / portfolio personal. Angular 22, standalone, zoneless, prerenderizada (SSG).

> Nota: el `CLAUDE.md` anterior de este directorio era una página de error HTTP 503 guardada por
> accidente y no contenía información. Este archivo lo sustituye.

## Comandos

```bash
npm start          # dev server
npm run build      # build de producción + prerender (salida estática)
npm test           # Vitest (unit + component)
npm run lint       # ESLint (TS + plantillas, incluye reglas de accesibilidad)
npm run format     # Prettier
npm run verify     # lint + test + build
```

## Stack

Angular 22 · TypeScript 6 strict · SCSS + CSS custom properties · Vitest · ESLint (angular-eslint)
· `@angular/ssr` en modo `outputMode: "static"` (prerender, sin servidor Node).

## Reglas del proyecto

- **Standalone siempre.** Nada de `NgModule`.
- **Signals**: `signal()`, `computed()`, `input()`, `output()`. `effect()` solo con necesidad real.
- **Control flow nativo**: `@if`, `@for`, `@switch`. Nada de `*ngIf` / `*ngFor`.
- `ChangeDetectionStrategy.OnPush` en todos los componentes.
- `inject()` en vez de inyección por constructor.
- Nomenclatura Angular 2025: `hero.ts` / `hero.html` / `hero.scss`, clase `Hero`, selector `app-hero`.
- **Cero dependencias runtime** más allá de Angular. Iconos = SVG inline propios; fuentes self-hosted.
- Prohibido `any`. Modelos `readonly`.

## Arquitectura

Plana y deliberada — sin capas Clean Architecture artificiales (no hay backend que invertir).

```
src/app/
├── core/models/      interfaces del dominio (readonly)
├── core/services/    seo.service.ts, active-section.service.ts  (única lógica con estado)
├── content/          *.content.ts — TODO el texto del sitio, tipado con `satisfies`
├── layout/           header/, footer/
├── features/landing/ landing-page + sections/
└── shared/ui/        primitivos: button, section-heading, icon, tech-badge
```

- **Editar el sitio = editar `src/app/content/`.** Los componentes de sección son tontos:
  reciben datos por `input()` y no conocen su origen.
- `LandingPage` es el único que lee `SITE_CONTENT`.
- Toda API de navegador (`window`, `document`, `IntersectionObserver`) va detrás de
  `isPlatformBrowser(inject(PLATFORM_ID))` — si no, revienta el prerender.

## Estilos

`src/styles/` con `@layer reset, tokens, base, components, utilities`. Tokens como CSS custom
properties. SCSS solo para mixins de breakpoints. Sin Tailwind ni Bootstrap.

## Documentación

Decisiones relevantes en `docs/adr/`. Guía de uso en `README.md`.
