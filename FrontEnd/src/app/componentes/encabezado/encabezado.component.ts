import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, TitleCasePipe],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class Encabezado {
  error = '';
  cerrandoSesion = false;

  constructor(private router: Router, protected auth: AuthService, private apiService: ApiService) {}

  get menu() {
    if (this.auth.isAuthenticated()) {
      return [
        { label: 'Inicio', path: '/inicio' },
        { label: 'Citas', path: '/citas' },
        { label: 'Bitácora', path: '/bitacora' },
        { label: 'Perfil', path: '/perfil' }
      ];
    }

    return [
      { label: 'Login', path: '/login' }
    ];
  }

  cerrarSesion(): void {
    if (this.cerrandoSesion) {
      return;
    }

    this.cerrandoSesion = true;
    this.error = '';

    this.apiService
      .logout()
      .pipe(finalize(() => (this.cerrandoSesion = false)))
      .subscribe({
        next: () => {
          this.auth.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'No se pudo contactar al servidor. Cerramos tu sesión localmente.';
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      });
  }
}
