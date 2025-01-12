import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Project, ProjectResponse } from '../model/projectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://prueba-backend-jhon.up.railway.app/api/project';  // URL de tu API en el backend
  private authHeader = 'Basic ' + btoa('admin:1234');  // Autenticación Basic con admin:1234

  constructor(private http: HttpClient) { }

  // Obtener todos los proyectos
  getAllProjects(): Observable<Project[]> {
    const headers = new HttpHeaders({ 'Authorization': this.authHeader });
    return this.http.get<Project[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo proyecto
  createProject(project: Project): Observable<ProjectResponse> {
    const headers = new HttpHeaders({ 'Authorization': this.authHeader });
    return this.http.post<ProjectResponse>(this.apiUrl, project, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un proyecto existente
  updateProject(id: number, project: Project): Observable<Project> {
    const headers = new HttpHeaders({ 'Authorization': this.authHeader });
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un proyecto
  deleteProject(id: number): Observable<void> {
    const headers = new HttpHeaders({ 'Authorization': this.authHeader });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Buscar un proyecto por ID
  getProjectById(id: number): Observable<Project> {
    const headers = new HttpHeaders({ 'Authorization': this.authHeader });
    return this.http.get<Project>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error', error);
    throw new Error('Error en la solicitud al backend');
  }
}
