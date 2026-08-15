import { IconName } from './icon-name';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}
