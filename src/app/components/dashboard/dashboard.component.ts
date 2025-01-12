import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ListCompanyComponent } from "../list-company/list-company.component";
import { CompanyService } from '../../service/company.service';
import { ProjectListComponent } from '../project-list/project-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ListCompanyComponent,ProjectListComponent,MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatIconModule, ListCompanyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  companyState: boolean = true;

  constructor(private companyService: CompanyService , private route:Router) {
    this.companyState = companyService.getState();
  }

  toggleCompanyPanel(): void {
    this.companyState = !this.companyState; // Cambia el estado para mostrar u ocultar el panel
    this.companyService.updateState(false);  // Actualiza el estado en el servicio, si es necesario
  }

  toggleCompanyPanel1(): void {
    this.companyState = !this.companyState; // Cambia el estado para mostrar u ocultar el panel
    this.companyService.updateState(true);  // Actualiza el estado en el servicio, si es necesario
  }
  
  exit():void{

    this.route.navigate([''])

  }

}
