import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/companyModel';
import { CompanyService } from '../../service/company.service';
import { NgForOf, NgIf } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/userModel';
import { ProjectListComponent } from '../project-list/project-list.component';
import { CompanyProjectsComponent } from "../company-projects/company-projects.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-company',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatTable,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatCardContent,
    MatSpinner,
    MatButton,
    ProjectListComponent,
    CompanyProjectsComponent
],
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css'] // Cambiado de styleUrl a styleUrls
})
export class ListCompanyComponent implements OnInit {

  showProjects: boolean = false;
  user: User | null = null; // Usuario cargado
  id: number = 0; // ID del usuario (si se necesita)
  error: string | null = null; // Mensaje de error
  receivedData: string | null = null; // Dato recibido desde la URL
  companies: Company[] = []; // Array para almacenar las empresas
  loading: boolean = true; // Variable para controlar el estado de carga
  displayedColumns: string[] = ['name_company', 'nit_company', 'address_company', 'email_company', 'phone_company']; // Columnas de la tabla
  visible: boolean = true; // Control de visibilidad


  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private userService: UserService,
   
  ) {

  
   }

  ngOnInit(): void {
    this.receivedData = this.route.snapshot.paramMap.get('data'); // Obtener dato desde la URL
    if (this.receivedData) {
      this.searchUser(this.receivedData); // Buscar el usuario por nombre
    }
    this.getCompanies(); // Cargar las empresas
  }

  /**
   * Obtiene la lista de todas las empresas.
   */
  getCompanies(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (data: Company[]) => {
        this.companies = data; // Asignar empresas obtenidas
        this.loading = false; // Ocultar el spinner
        console.log('Empresas encontradas:', this.companies);
      },
      error: (error) => {
        console.error('Error al obtener las empresas:', error);
        this.loading = false; // Ocultar el spinner en caso de error
      }
    });
  }

  /**
   * Busca un usuario por su nombre de usuario.
   * @param username Nombre de usuario
   */
  searchUser(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (data) => {
        this.user = data; // Usuario encontrado
        this.id = this.user.company.id_company;
        this.error = null; // Limpia cualquier error previo
        console.log('Usuario encontrado:', this.user);
      },
      error: (err) => {
        console.error('Error al buscar el usuario:', err);
        this.error = 'Usuario no encontrado o error en la solicitud';
        this.user = null; // Limpia cualquier dato previo
      }
    });
  }


  viewProjects(){
    if(this.showProjects){
      this.showProjects= false;
     
    }else{
      this.showProjects= true;
    }
  }
}
