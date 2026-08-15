# ADR 0004 — El contenido vive como constantes TypeScript

Estado: aceptada · 2026-08-13

## Contexto

El texto del sitio no debía estar mezclado con el markup, y debía ser fácil de editar sin
reescribir componentes. Tampoco tenía sentido montar un CMS para un portfolio personal.

## Decisión

Un archivo por dominio de contenido en `src/app/content/`, tipado contra los modelos de
`core/models`. `site.content.ts` los agrega en `SITE_CONTENT`, que solo leen `App` (shell) y
`LandingPage`; las secciones reciben todo por `input()`.

Un test (`site.content.spec.ts`) protege las invariantes: ids únicos, anclas válidas, enlaces
absolutos o `mailto:`, textos no vacíos.

## Alternativas

1. **JSON en `public/` + `HttpClient`.** Añade una petición, un estado de carga y pierde el
   tipado en compilación; además complica el prerender sin dar nada a cambio.
2. **Markdown + parser.** Requiere una dependencia de parseo y sanitización para un contenido
   que son frases sueltas, no artículos.
3. **CMS headless.** Coste, cuenta externa y latencia para un sitio de una persona.
4. **Constantes TypeScript (elegida).** Cero runtime, tipado estricto y tree-shaking.

## Consecuencias

- Un icono inexistente o un campo que falta rompen el build, no la página en producción.
- El JSON-LD se deriva del mismo contenido: no hay dos fuentes de verdad que se desincronicen.
- Migrar a una API en el futuro es sustituir la constante por un servicio con la misma forma.
- Editar contenido requiere rebuild (ver ADR 0003).
