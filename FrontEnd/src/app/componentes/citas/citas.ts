import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService, CitaSummary } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas implements OnInit {
  citas: CitaSummary[] = [];
  cargando = false;
  error = '';
  mensaje = '';
  creando = false;
  cancelandoId: number | null = null;

  formulario = {
    fecha_cita: '',
    hora_cita: '',
    motivo: ''
  };

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get auth() {
    return this.authService;
  }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .listarCitas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (citas) => {
          this.citas = citas;
        },
        error: (err) => {
          console.error(err);
          this.error = 'No fue posible cargar las citas.';
        }
      });
  }

  agendarCita(): void {
    if (!this.formulario.fecha_cita || !this.formulario.hora_cita) {
      this.error = 'Selecciona la fecha y hora de la cita.';
      return;
    }

    this.creando = true;
    this.error = '';
    this.mensaje = '';

    const payload = {
      fecha_cita: this.formulario.fecha_cita,
      hora_cita: this.formulario.hora_cita,
      motivo: this.formulario.motivo || undefined
    };

    this.apiService
      .crearCita(payload)
      .pipe(finalize(() => (this.creando = false)))
      .subscribe({
        next: ({ message, cita }) => {
          this.mensaje = message;
          this.resetFormulario();
          this.citas = [cita, ...this.citas];
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No fue posible agendar la cita.';
        }
      });
  }

  cancelarCita(cita: CitaSummary): void {
    this.cancelandoId = cita.id;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .cancelarCita(cita.id)
      .pipe(finalize(() => (this.cancelandoId = null)))
      .subscribe({
        next: ({ message, cita: citaActualizada }) => {
          this.mensaje = message;
          this.citas = this.citas.map((item) => (item.id === cita.id ? citaActualizada : item));
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No fue posible cancelar la cita.';
        }
      });
  }

  puedeCancelar(cita: CitaSummary): boolean {
    const rol = this.authService.currentRole();
    return cita.estatus !== 'cancelada' && cita.estatus !== 'atendida' && rol === 'alumno';
  }

  puedeAtender(cita: CitaSummary): boolean {
    const rol = this.authService.currentRole();
    return cita.estatus === 'programada' && rol === 'doctor';
  }

  atenderCita(cita: CitaSummary): void {
    this.cancelandoId = cita.id;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .atenderCita(cita.id)
      .pipe(finalize(() => (this.cancelandoId = null)))
      .subscribe({
        next: ({ message, cita: citaActualizada }) => {
          this.mensaje = message;
          this.citas = this.citas.map((item) => (item.id === cita.id ? citaActualizada : item));
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No fue posible marcar la cita como atendida.';
        }
      });
  }

  private resetFormulario(): void {
    this.formulario = {
      fecha_cita: '',
      hora_cita: '',
      motivo: ''
    };
  }
}
