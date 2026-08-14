# ADR 0002 — SCSS con design tokens en CSS custom properties

Estado: aceptada · 2026-08-13

## Contexto

Hacía falta un sistema visual propio (color, tipografía, espaciado, formas, movimiento) que
soportara tema claro y oscuro, fuera responsive y no pareciera una plantilla genérica.

## Decisión

CSS moderno organizado con `@layer reset, tokens, base, components, utilities`. Los tokens son
**CSS custom properties** en `:root`. SCSS se usa solo para lo que el CSS nativo no resuelve:
mixins de media queries (`src/styles/_breakpoints.scss`).

## Alternativas

1. **Tailwind CSS.** Añade dependencia, configuración y un pipeline extra; llena las plantillas
   de largas cadenas de utilidades y dificulta ver el sistema visual como un todo. Para un
   sitio de cinco secciones el coste supera el beneficio.
2. **Bootstrap u otro framework visual.** Impone una estética reconocible: exactamente lo que
   se quería evitar.
3. **Solo CSS nativo, sin preprocesador.** Casi suficiente; las media queries no aceptan
   custom properties, así que los breakpoints acabarían repetidos literalmente.

## Consecuencias

- El tema oscuro es un bloque de reasignaciones de variables: sin duplicar reglas.
- Los componentes usan `var(--...)` y no conocen valores concretos.
- `stylePreprocessorOptions.includePaths` permite `@use 'breakpoints'` desde cualquier
  componente, sin rutas relativas frágiles.
- Las clases globales (`.btn`, `.card`, `.container`) viven en la capa `components`; los estilos
  de componente, al estar fuera de capas, siempre ganan si necesitan matizar algo.
