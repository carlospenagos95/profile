import { IconName } from './icon-name';

/**
 * Nivel de dominio. Se muestra como etiqueta textual —no como barras de porcentaje,
 * que no significan nada— y permite ordenar visualmente cada grupo.
 */
export type TechnologyLevel = 'core' | 'proficient' | 'familiar';

export interface Technology {
  readonly name: string;
  readonly level: TechnologyLevel;
  /** Contexto opcional: en qué la has usado. Evita la pared de logos sin significado. */
  readonly note?: string;
}

export interface TechnologyGroup {
  readonly id: string;
  readonly label: string;
  readonly icon: IconName;
  readonly items: readonly Technology[];
}
