import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { SITE_CONTENT } from './content/site.content';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** El shell y la página son los dos únicos puntos que leen el contenido. */
  protected readonly content = SITE_CONTENT;
}
