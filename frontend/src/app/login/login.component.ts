import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: string = 'student';
  
  studentData = {
    controlNumber: '',
    nip: ''
  };

  doctorData = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onStudentLogin() {
    this.router.navigate(['/student-dashboard']);
  }

  onDoctorLogin() {
    this.router.navigate(['/doctor-dashboard']);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}