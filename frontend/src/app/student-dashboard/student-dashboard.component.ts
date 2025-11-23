import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  activeSection: string = 'inicio';
  studentName: string = 'Juan Pérez'; // Temporal - luego vendrá de la BD

  constructor(private router: Router) {}

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  logout() {
    // Aquí luego agregaremos limpieza de tokens/sesión
    console.log('Cerrando sesión...');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}