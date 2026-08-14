# ADR 0003 — Prerender (SSG) con salida estática

Estado: aceptada · 2026-08-13

## Contexto

Un portfolio necesita ser indexable y cargar rápido, pero su contenido es estático: no depende
de la petición ni de ningún usuario autenticado.

## Decisión

`@angular/ssr` configurado con `RenderMode.Prerender` para todas las rutas y
`"outputMode": "static"` en `angular.json`. El build emite HTML completo por ruta y la
hidratación usa `provideClientHydration(withEventReplay())`.

Se eliminaron `src/server.ts` y la dependencia `express` que genera `ng new --ssr`: no hay
servidor que mantener.

## Alternativas

1. **CSR puro.** El HTML inicial iría vacío; el contenido dependería de que el crawler ejecute
   JavaScript y el LCP sufriría en conexiones lentas.
2. **SSR con servidor Node.** Aporta valor cuando el HTML depende de la petición. Aquí solo
   añadiría un proceso que desplegar, monitorizar y pagar.
3. **Prerender (elegida).** Mismo HTML para todos, servible desde CDN.

## Consecuencias

- El despliegue es copiar `dist/personal-landing/browser` a cualquier hosting estático.
- `SeoService` se ejecuta durante el prerender: title, Open Graph y JSON-LD quedan dentro del
  HTML generado (verificado en el build).
- **Restricción permanente:** ningún acceso directo a `window`/`document` fuera de
  `isPlatformBrowser` o `afterNextRender`, o el build de prerender falla.
- Cambiar un texto exige rebuild y redeploy. Aceptable: no hay redacción externa.
