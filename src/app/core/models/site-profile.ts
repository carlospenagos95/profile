export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface SiteProfile {
  /** Nombre completo. Alimenta el `<h1>`, el `<title>` y el JSON-LD `Person`. */
  readonly name: string;
  /** Titular profesional, p. ej. "Senior Angular Engineer". */
  readonly headline: string;
  /** Una o dos frases: qué problema resuelves y para quién. */
  readonly valueProposition: string;
  /** Bio en párrafos. */
  readonly bio: readonly string[];
  readonly location?: string;
  readonly avatar?: ImageAsset;
}
