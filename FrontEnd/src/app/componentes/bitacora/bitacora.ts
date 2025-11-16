import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, BitacoraEntry } from '../../services/api.service';

@Component({
  selector: 'app-bitacora',
  imports: [CommonModule],
  templateUrl: './bitacora.html',
  styleUrl: './bitacora.css'
})
export class Bitacora implements OnInit {

  bitacoras: BitacoraEntry[] = [];
  cargando = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarBitacoras();
  }

  cargarBitacoras() {
    this.cargando = true;
    this.error = '';

    this.apiService.listarBitacoras().subscribe({
      next: (datos) => {
        this.bitacoras = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Ocurrió un problema al cargar la bitácora.';
        this.cargando = false;
      }
    });
  }
}