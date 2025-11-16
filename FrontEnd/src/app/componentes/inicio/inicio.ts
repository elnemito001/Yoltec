import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
    standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  nombre = '-';
  edad = 1;
  carrera = '-';
  semestre = '-';

  intereses = [
    '-',
    '-',
    '-',
    '-'
  ];
}