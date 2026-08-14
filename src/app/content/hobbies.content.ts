import { Hobby } from '../core/models/hobby';

export const HOBBIES: readonly Hobby[] = [
  {
    id: 'futbol',
    title: 'Fútbol',
    description: 'El partido del fin de semana es sagrado, se juegue o se vea.',
    icon: 'ball',
  },
  {
    id: 'acordeon',
    title: 'Acordeones',
    description: 'Me fascinan los acordeones: el instrumento y todo lo que suena a través de él.',
    icon: 'accordion',
  },
  {
    id: 'vallenato',
    title: 'Música vallenata',
    description: 'Lo que suena de fondo mientras programo, y lo que pongo cuando termino.',
    icon: 'music',
  },
  {
    id: 'criolla-peruana',
    title: 'Música criolla peruana',
    description: 'Valses y guitarra criolla: otro país, la misma debilidad por las cuerdas.',
    icon: 'guitar',
  },
  {
    id: 'viajar',
    title: 'Viajar y pasear',
    description: 'Conocer lugares nuevos, sin prisa y con tiempo para mirar alrededor.',
    icon: 'plane',
  },
  {
    id: 'caminar',
    title: 'Caminar',
    description: 'Caminar largo despeja la cabeza mejor que cualquier pausa frente a la pantalla.',
    icon: 'footprints',
  },
];
