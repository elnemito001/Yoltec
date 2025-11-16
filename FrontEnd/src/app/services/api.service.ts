import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

export interface CitaSummary {
  id: number;
  clave_cita: string;
  fecha_cita: string;
  hora_cita: string;
  motivo?: string | null;
  estatus: string;
  fecha_hora_atencion?: string | null;
  doctor?: UsuarioResumen | null;
  alumno?: UsuarioResumen | null;
}

export interface BitacoraEntry {
  id: number;
  cita_id: number;
  alumno_id: number;
  doctor_id: number;
  diagnostico?: string | null;
  tratamiento?: string | null;
  observaciones?: string | null;
  peso?: string | null;
  altura?: string | null;
  temperatura?: string | null;
  presion_arterial?: string | null;
  created_at: string;
  updated_at: string;
  cita?: CitaSummary;
  alumno?: UsuarioResumen;
  doctor?: UsuarioResumen;
}

export interface Receta {
  id: number;
  cita_id: number;
  alumno_id: number;
  doctor_id: number;
  medicamentos: string;
  indicaciones?: string | null;
  fecha_emision: string;
  created_at: string;
  updated_at: string;
  cita?: CitaSummary;
  alumno?: UsuarioResumen;
  doctor?: UsuarioResumen;
}

export interface UsuarioResumen {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo: string;
  numero_control?: string | null;
  username?: string | null;
}

export interface PerfilResponse {
  perfil: UsuarioResumen & {
    telefono?: string | null;
    fecha_nacimiento?: string | null;
  };
}

export interface PerfilUpdateRequest {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  fecha_nacimiento?: string;
}

export interface CambiarPasswordRequest {
  password_actual: string;
  password_nuevo: string;
  password_nuevo_confirmation: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  // Auth
  logout(): Observable<{ message: string }> {
    const url = `${API_BASE_URL}/logout`;
    return this.http.post<{ message: string }>(url, {});
  }

  getPerfil(): Observable<PerfilResponse> {
    const url = `${API_BASE_URL}/perfil`;
    return this.http.get<PerfilResponse>(url);
  }

  actualizarPerfil(payload: PerfilUpdateRequest): Observable<PerfilResponse> {
    const url = `${API_BASE_URL}/perfil`;
    return this.http.put<PerfilResponse>(url, payload);
  }

  cambiarPassword(payload: CambiarPasswordRequest): Observable<{ message: string }> {
    const url = `${API_BASE_URL}/perfil/cambiar-password`;
    return this.http.post<{ message: string }>(url, payload);
  }

  // Citas
  listarCitas(): Observable<CitaSummary[]> {
    const url = `${API_BASE_URL}/citas`;
    return this.http.get<CitaSummary[]>(url);
  }

  crearCita(payload: Partial<CitaSummary> & { fecha_cita: string; hora_cita: string }): Observable<{ message: string; cita: CitaSummary }> {
    const url = `${API_BASE_URL}/citas`;
    return this.http.post<{ message: string; cita: CitaSummary }>(url, payload);
  }

  cancelarCita(id: number): Observable<{ message: string; cita: CitaSummary }> {
    const url = `${API_BASE_URL}/citas/${id}/cancelar`;
    return this.http.post<{ message: string; cita: CitaSummary }>(url, {});
  }

  atenderCita(id: number): Observable<{ message: string; cita: CitaSummary }> {
    const url = `${API_BASE_URL}/citas/${id}/atender`;
    return this.http.post<{ message: string; cita: CitaSummary }>(url, {});
  }

  obtenerCita(id: number): Observable<CitaSummary> {
    const url = `${API_BASE_URL}/citas/${id}`;
    return this.http.get<CitaSummary>(url);
  }

  // Bitácoras
  listarBitacoras(): Observable<BitacoraEntry[]> {
    const url = `${API_BASE_URL}/bitacoras`;
    return this.http.get<BitacoraEntry[]>(url);
  }

  crearBitacora(payload: Partial<BitacoraEntry> & { cita_id: number }): Observable<{ message: string; bitacora: BitacoraEntry }> {
    const url = `${API_BASE_URL}/bitacoras`;
    return this.http.post<{ message: string; bitacora: BitacoraEntry }>(url, payload);
  }

  actualizarBitacora(id: number, payload: Partial<BitacoraEntry>): Observable<{ message: string; bitacora: BitacoraEntry }> {
    const url = `${API_BASE_URL}/bitacoras/${id}`;
    return this.http.put<{ message: string; bitacora: BitacoraEntry }>(url, payload);
  }

  obtenerBitacora(id: number): Observable<BitacoraEntry> {
    const url = `${API_BASE_URL}/bitacoras/${id}`;
    return this.http.get<BitacoraEntry>(url);
  }

  // Recetas
  listarRecetas(): Observable<Receta[]> {
    const url = `${API_BASE_URL}/recetas`;
    return this.http.get<Receta[]>(url);
  }

  crearReceta(payload: Partial<Receta>): Observable<{ message: string; receta: Receta }> {
    const url = `${API_BASE_URL}/recetas`;
    return this.http.post<{ message: string; receta: Receta }>(url, payload);
  }

  obtenerReceta(id: number): Observable<Receta> {
    const url = `${API_BASE_URL}/recetas/${id}`;
    return this.http.get<Receta>(url);
  }
}
