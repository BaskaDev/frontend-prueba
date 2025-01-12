import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/companyModel';
 // Asegúrate de definir este modelo

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyState: boolean = true;

  private apiUrl = 'https://prueba-backend-jhon.up.railway.app/api/company';  // Asegúrate de usar la URL correcta
  private auth = 'Basic ' + btoa('admin:1234');  // Autenticación básica (usuario:admin, contraseña:1234)

  constructor(private http: HttpClient) { }

  createCompany(company: Company): Observable<Company> {
    const headers = new HttpHeaders().set('Authorization', this.auth);
    return this.http.post<Company>(this.apiUrl, company, { headers });
  }

  getAllCompanies(): Observable<Company[]> {
    const headers = new HttpHeaders().set('Authorization', this.auth);
    return this.http.get<Company[]>(this.apiUrl, { headers });
  }


  getState(): boolean {
    return this.companyState;
  }

  updateState(value:boolean): void {
    this.companyState = value;  // Cambia el estado de visibilidad
  }
}
