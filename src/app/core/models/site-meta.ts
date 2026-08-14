export interface SiteMeta {
  /** Origen canónico sin barra final, p. ej. `https://ejemplo.dev`. */
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly locale: string;
  /** Ruta a la imagen de Open Graph, relativa a `public/`. */
  readonly ogImage: string;
}
