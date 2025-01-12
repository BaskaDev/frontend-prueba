import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, TicketResponse } from '../model/ticketModel';
 // Ruta al archivo que contiene la interfaz Ticket

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'https://prueba-backend-jhon.up.railway.app/api/ticket'; // URL base del backend
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:1234'),
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los tickets
   * @returns Observable con la lista de tickets
   */
  getAll(): Observable<TicketResponse[]> {
    return this.http.get<TicketResponse[]>(this.apiUrl, { headers: this.headers });
  }

  /**
   * Busca un ticket por ID
   * @param id ID del ticket a buscar
   * @returns Observable con los datos del ticket
   */
  findById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  /**
   * Crea un nuevo ticket
   * @param ticket Datos del ticket a crear
   * @returns Observable con el ticket creado
   */
  create(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, { headers: this.headers });
  }

  /**
   * Actualiza un ticket existente
   * @param id ID del ticket a actualizar
   * @param ticket Datos actualizados del ticket
   * @returns Observable con el ticket actualizado
   */
  update(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket, { headers: this.headers });
  }

  /**
   * Elimina un ticket por su ID
   * @param id ID del ticket a eliminar
   * @returns Observable con la respuesta del servidor
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
