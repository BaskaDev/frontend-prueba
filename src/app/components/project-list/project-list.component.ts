import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/projectModel';
import { ProjectService } from '../../service/project.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { UserService } from '../../service/user.service';
import { User } from '../../model/userModel';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ MatTableModule,NgIf,
    MatSpinner],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  users: User[] = []
  loading: boolean = true; // Variable para mostrar el estado de carga
  displayedColumns: string[] = ['username_user'];// Definir las columnas de la tabla

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.loading = false; // Ocultar el spinner después de cargar los proyectos
        console.log('Proyectos encontrados:', this.users);
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
        this.loading = false; // Ocultar el spinner en caso de error
      }
    });
  }
}