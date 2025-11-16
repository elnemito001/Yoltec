import { Injectable, computed, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

export interface AuthUser {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo: 'alumno' | 'doctor' | string;
  numero_control?: string | null;
  username?: string | null;
}

export interface LoginRequest {
  identificador: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
  token: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'yoltec_token';
  private readonly userKey = 'yoltec_user';

  private tokenSignal = signal<string | null>(this.restoreToken());
  private userSignal = signal<AuthUser | null>(this.restoreUser());

  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly currentUser = computed(() => this.userSignal());
  readonly currentRole = computed(() => this.userSignal()?.tipo ?? null);

  constructor(private http: HttpClient) {
    effect(() => {
      const token = this.tokenSignal();
      if (token) {
        localStorage.setItem(this.tokenKey, token);
      } else {
        localStorage.removeItem(this.tokenKey);
      }
    });

    effect(() => {
      const user = this.userSignal();
      if (user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.userKey);
      }
    });
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    const url = `${API_BASE_URL}/login`;
    return this.http.post<LoginResponse>(url, payload).pipe(
      tap((response) => {
        this.setSession(response.token, response.user);
      })
    );
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  updateUser(user: AuthUser): void {
    this.userSignal.set(user);
  }

  setSession(token: string, user: AuthUser): void {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  isLoggedIn(): boolean {
    return !!this.tokenSignal();
  }

  private restoreToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private restoreUser(): AuthUser | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
