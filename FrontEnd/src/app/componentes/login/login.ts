import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  activeTab: string = 'student';
  loading = false;
  error = '';
  
  studentData = {
    controlNumber: '',
    nip: ''
  };

  doctorData = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onStudentLogin() {
    if (!this.studentData.controlNumber || !this.studentData.nip) {
      this.error = 'Completa tu número de control y NIP.';
      return;
    }

    this.autenticar({
      identificador: this.studentData.controlNumber,
      password: this.studentData.nip
    });
  }

  onDoctorLogin() {
    if (!this.doctorData.username || !this.doctorData.password) {
      this.error = 'Completa tu usuario y contraseña.';
      return;
    }

    this.autenticar({
      identificador: this.doctorData.username,
      password: this.doctorData.password
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.error = '';
  }

  private autenticar(payload: { identificador: string; password: string }) {
    this.loading = true;
    this.error = '';

    this.authService
      .login(payload)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
          const mensaje = err?.error?.identificador?.[0] || err?.error?.message || 'No fue posible iniciar sesión.';
          this.error = mensaje;
        }
      });
  }
}
