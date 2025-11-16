import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './componentes/encabezado/encabezado.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Encabezado],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('YOLTEC');
}
