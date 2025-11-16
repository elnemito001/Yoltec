import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService, PerfilResponse } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  cargando = false;
  guardando = false;
  cambiandoPassword = false;
  mensaje = '';
  error = '';

  datosPerfil = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: ''
  };

  formularioPassword = {
    password_actual: '',
    password_nuevo: '',
    password_nuevo_confirmation: ''
  };

  constructor(private apiService: ApiService, protected auth: AuthService) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .getPerfil()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (respuesta: PerfilResponse) => {
          const { perfil } = respuesta;
          this.datosPerfil = {
            nombre: perfil.nombre ?? '',
            apellido: perfil.apellido ?? '',
            email: perfil.email ?? '',
            telefono: perfil.telefono ?? '',
            fecha_nacimiento: perfil.fecha_nacimiento ?? ''
          };
        },
        error: (err) => {
          console.error(err);
          this.error = 'No fue posible cargar tu perfil.';
        }
      });
  }

  guardarPerfil(): void {
    this.guardando = true;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .actualizarPerfil({
        ...this.datosPerfil,
        telefono: this.datosPerfil.telefono || undefined,
        fecha_nacimiento: this.datosPerfil.fecha_nacimiento || undefined
      })
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe({
        next: ({ perfil }) => {
          this.mensaje = 'Perfil actualizado correctamente.';
          const token = this.auth.getToken();
          if (token) {
            this.auth.setSession(token, perfil);
          } else {
            this.auth.updateUser(perfil);
          }
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No se pudo actualizar el perfil.';
        }
      });
  }

  cambiarPassword(): void {
    if (this.formularioPassword.password_nuevo !== this.formularioPassword.password_nuevo_confirmation) {
      this.error = 'La confirmación no coincide con la nueva contraseña.';
      return;
    }

    this.cambiandoPassword = true;
    this.error = '';
    this.mensaje = '';

    this.apiService
      .cambiarPassword({ ...this.formularioPassword })
      .pipe(finalize(() => (this.cambiandoPassword = false)))
      .subscribe({
        next: ({ message }) => {
          this.mensaje = message;
          this.formularioPassword = {
            password_actual: '',
            password_nuevo: '',
            password_nuevo_confirmation: ''
          };
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No se pudo actualizar la contraseña.';
        }
      });
  }
}
