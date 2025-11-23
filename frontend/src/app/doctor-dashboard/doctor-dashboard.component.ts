import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent {
  activeSection: string = 'inicio';
  doctorName: string = 'Dr. García'; // Temporal - luego vendrá de la BD

  constructor(private router: Router) {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    // Aquí luego agregaremos limpieza de tokens/sesión
    console.log('Cerrando sesión del doctor...');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}