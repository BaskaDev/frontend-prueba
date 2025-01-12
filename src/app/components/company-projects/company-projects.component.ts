import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/projectModel';
import { ProjectService } from '../../service/project.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Company } from '../../model/companyModel';
import { User } from '../../model/userModel';
import { MatButton } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TicketService } from '../../service/ticket.service';
import { UserStory, UserStoryResponse } from '../../model/userStoryModel';
import { UserStoryService } from '../../service/user-story.service';
import { Ticket, TicketResponse } from '../../model/ticketModel';
import { Router } from 'express';

@Component({
  selector: 'app-company-projects',
  standalone: true,
  imports: [MatTableModule, NgIf, MatButton, ReactiveFormsModule, MatSpinner ,NgForOf],
  templateUrl: './company-projects.component.html',
  styleUrl: './company-projects.component.css',
})
export class CompanyProjectsComponent implements OnInit {
  displayedColumns3: string[] = ['title_tickets', 'description_tickets', 'status_tickets'];  
   displayedColumns1: string[] = ['id_users_stories', 'title_users_stories'];// Columnas visibles en la tabla
  displayedColumns: string[] = ['name_project', 'company']; 
  ticketsResponse: TicketResponse[] = [];
  projects: Project[] = [];
  showHu:boolean = false;

  userStories: UserStoryResponse[] = [];
  idProject: number = 0;
  loading: boolean = true; // Variable para mostrar el estado de carga
// Definir las columnas de la tabla
  receivedData: string | null = null;
  newUserStory: UserStoryResponse  | null = null;
  showProjects: boolean = false;
  user: User | null = null; // Usuario cargado
  id: number = 0; // ID del usuario (si se necesita)
  error: string | null = null; // Mensaje de error
  proyectForm: FormGroup;
  visible: boolean = true;
  ticketForm: FormGroup;
  showFormProject:boolean = true;
  showFormUserStory:boolean = false;
  showFormTicket: boolean = false;
  idHu:number = 0;
  showTicket:boolean = false;

  constructor(
    private projectService: ProjectService,
    private ticketService: TicketService,
    private userStoryService: UserStoryService,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,

  ) {
    this.proyectForm = this.fb.group({
      name_project: ['', [Validators.required]],
    });

    this.ticketForm = this.fb.group({
      title_tickets:['' , [Validators.required]],
      description_tickets: ['',[Validators.required]]
    })

  }

  addProyect() {

    this.showHu=false;
    this.showTicket = false;


    if(!this.proyectForm.invalid){
      console.log(this.proyectForm.value);

      const newProject:Project ={
          name_project:this.proyectForm.value.name_project,
          company:{
            id_company:this.id
          }
      }

      this.projectService.createProject(newProject).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          alert('Proyecto registrado con éxito');
          this.proyectForm.reset();
          this.idProject = response.id_project;
          this.getProjects(response.company.id_company);
          this.showFormProject = false;
          this.showFormUserStory = true;

        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          alert('Ocurrió un error al registrar el usuario');
        }
      });

      

      
    }

  

  }
  ngOnInit(): void {
    this.receivedData = this.route.snapshot.paramMap.get('data');
    if (this.receivedData) {
      this.searchUser(this.receivedData);
    }
 
  }
  getProjects(id:number): void {
    this.projectService.getAllProjects().subscribe({
      next: (data: Project[]) => {
        // Filtrar los proyectos por id_company
        this.projects = data.filter(
          (project) => project.company.id_company === id
        );
        this.loading = false; // Ocultar el spinner después de cargar los proyectos
        console.log('Proyectos encontrados:', this.projects);
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
        this.loading = false; // Ocultar el spinner en caso de error
      },
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
        console.log('Usuario encontrado:', this.id);
        this.getProjects(this.id);
      },
      error: (err) => {
        console.error('Error al buscar el usuario:', err);
        this.error = 'Usuario no encontrado o error en la solicitud';
        this.user = null; // Limpia cualquier dato previo
      },
    });
  }

  addUserStory(){
      
    if(!this.proyectForm.invalid){
      console.log(this.proyectForm.value);

      const newProject: UserStory = {
        title_users_stories: this.proyectForm.value.name_project,
        project: {
          id_project: this.idProject
        }
      };
      
      console.log(newProject);

      this.userStoryService.createUserStory(newProject).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          alert('Historia de usuario registrada con éxito');
          this.newUserStory = response;
          this.proyectForm.reset();
          if(this.user != null){
            this.getProjects(this.user.company.id_company);
          }
       
          this.showFormProject = false;
          this.showFormUserStory = false;
          this.showFormTicket=true;

        },
        error: (err) => {
          console.error('Error al crear el usuario:', err);
          alert('Ocurrió un error al registrar el usuario');
        }
      });

      

      
    }

  }

  addTicket() {
    // Verificar si el formulario es válido
    if (this.ticketForm.invalid) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
  
    // Verificar si se ha seleccionado una User Story
    if (this.newUserStory != null) {
      const ticket: Ticket = {
        title_tickets: this.ticketForm.value.title_tickets,
        description_tickets: this.ticketForm.value.description_tickets,
        status_tickets: 'En progreso', // Cambia el estado según sea necesario
        userStory: {
          id_users_stories: this.newUserStory.id_users_stories, // Asegúrate de que `newUserStory` tenga el id adecuado
        }
      };

      this.ticketService.create(ticket).subscribe({
        next: (response) => {
          console.log('Ticket creado exitosamente:', response);
          alert('Ticket creado con éxito');
          this.ticketForm.reset();
          this.showFormTicket = false; // Restablecer el formulario después de la creación
          // Realizar otras acciones si es necesario (por ejemplo, actualizar la lista de tickets)
        },
        error: (err) => {
          console.error('Error al crear el ticket:', err);
          alert('Ocurrió un error al crear el ticket');
        }
      });
    }else{
      const ticket: Ticket = {
        title_tickets: this.ticketForm.value.title_tickets,
        description_tickets: this.ticketForm.value.description_tickets,
        status_tickets: 'En progreso', // Cambia el estado según sea necesario
        userStory: {
          id_users_stories: this.idHu, // Asegúrate de que `newUserStory` tenga el id adecuado
        }
      };

      this.ticketService.create(ticket).subscribe({
        next: (response) => {
          console.log('Ticket creado exitosamente:', response);
          alert('Ticket creado con éxito');
          this.ticketForm.reset();
          this.showFormTicket = false; // Restablecer el formulario después de la creación
          // Realizar otras acciones si es necesario (por ejemplo, actualizar la lista de tickets)
        },
        error: (err) => {
          console.error('Error al crear el ticket:', err);
          alert('Ocurrió un error al crear el ticket');
        }
      });
    }
  
    // Crear el objeto `ticket`
   
  
    // Llamar al servicio para crear el ticket
   
  }
  
 
  showUserStorys(id:number){

    this.idProject = id
    
    this.userStoryService.getAllUserStories().subscribe({
      next: (data: UserStoryResponse[]) => {
        // Filtrar los proyectos por id_company
        this.userStories = data.filter(
          (userStory) => userStory.project.id_project === id
        );
        this.loading = false; // Ocultar el spinner después de cargar los proyectos
        console.log('Proyectos encontrados:', this.userStories);
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
        this.loading = false; // Ocultar el spinner en caso de error
      },
    });


        this.showHu = true;
        this.showTicket = false;
    
  } 

  showTickets(id: number): void {
    this.idHu = id;
    console.log('TICKETS')
  
    this.loading = true; // Mostrar el spinner al comenzar la carga
  
    this.ticketService.getAll().subscribe({
      next: (data: TicketResponse[]) => {
        // Filtrar los tickets relacionados con el id de userStory
        this.ticketsResponse = data.filter(
          (ticket) => ticket.userStory.id_users_stories === this.idHu
        );
        this.loading = false; // Ocultar el spinner después de cargar los tickets
        console.log('Tickets encontrados:', this.ticketsResponse);
      },
      error: (error) => {
        console.error('Error al obtener tickets:', error);
        this.loading = false; // Ocultar el spinner en caso de error
      },
    });

    this.showTicket = true;
  }
  

  crearHistoria(){
    this.showHu = false;
    this.showFormUserStory = true;
  }

  crearTicket(){
    this.showHu = false;
    this.showFormTicket = true;
    this.showTicket = false;
  }

  cancelarHu(){
    this.showHu = false;
    this.showFormUserStory = false;
  }

  cancelarTi(){
    this.showHu = false;
    this.showFormTicket = false;
    this.showTicket = false;
  }

}
