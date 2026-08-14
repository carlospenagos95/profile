# ADR 0001 — Clean Architecture pragmática, sin capas artificiales

Estado: aceptada · 2026-08-13

## Contexto

El requisito pedía aplicar Clean Architecture. La estructura de referencia
(`core/{domain,application,infrastructure}` + las mismas cuatro capas dentro de cada feature)
se evaluó para una landing de una sola página, sin backend, sin autenticación y sin estado
de servidor.

## Decisión

No se adopta la estructura por capas. La aplicación se organiza por responsabilidad real:
`core/models`, `core/services`, `content`, `layout`, `features/landing`, `shared`.

Se conservan los principios: separación contenido/presentación, componentes de sección sin
dependencias, servicios como único lugar con estado o APIs de plataforma.

## Alternativas

1. **Capas completas por feature.** Produciría repositorios sin fuente de datos, casos de uso
   que devuelven una constante y servicios que solo contienen texto. Cada cambio de copy
   tocaría cuatro archivos.
2. **Todo dentro de los componentes.** Rápido, pero mezcla contenido y markup: cambiar un
   texto obligaría a editar plantillas y rompería los tests de contenido.
3. **Estructura por responsabilidad (elegida).** Una única separación fuerte —contenido
   frente a presentación— que es la que realmente cambia con frecuencia.

## Consecuencias

- Editar el sitio = editar `src/app/content/`. Los componentes no se tocan.
- Menos archivos y menos indirección; la curva de entrada es leer seis carpetas.
- Si algún día el contenido viene de una API, se sustituye la constante por un servicio con
  la misma forma: los componentes, que reciben todo por `input()`, no cambian.
- Riesgo aceptado: si el proyecto creciera a varias features con lógica de negocio real,
  habría que introducir capas entonces —cuando exista el problema que justifican.
