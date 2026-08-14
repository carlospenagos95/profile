/**
 * Union cerrada de iconos disponibles. Es la única "abstracción" del dominio con coste:
 * garantiza en tiempo de compilación que todo icono citado por el contenido existe
 * realmente en el registro SVG (`shared/ui/icon`).
 */
export type IconName =
  // Marcas / contacto
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'phone'
  | 'globe'
  // Servicios
  | 'code'
  | 'layers'
  | 'server'
  | 'cloud'
  | 'gauge'
  | 'accessibility'
  | 'compass'
  // Hobbies
  | 'book'
  | 'music'
  | 'camera'
  | 'mountain'
  | 'gamepad'
  | 'ball'
  | 'accordion'
  | 'guitar'
  | 'plane'
  | 'footprints'
  // Categorías técnicas
  | 'database'
  | 'terminal'
  | 'robot'
  // Interfaz
  | 'arrow-right'
  | 'external-link'
  | 'menu'
  | 'close';
