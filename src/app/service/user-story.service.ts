import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory, UserStoryResponse } from '../model/userStoryModel'; // Asegúrate de que el modelo esté correctamente definido.

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
  private apiUrl = 'https://prueba-backend-jhon.up.railway.app/api/userStory'; // URL base del backend

  // Configuración de headers HTTP, incluyendo autenticación básica
  private httpHeaders = new HttpHeaders({
    Authorization: `Basic ${btoa('admin:1234')}`, // Codifica las credenciales en Base64
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las User Stories.
   * @returns Un Observable con un array de UserStory.
   */
  getAllUserStories(): Observable<UserStoryResponse[]> {
    return this.http.get<UserStoryResponse[]>(this.apiUrl, {
      headers: this.httpHeaders
    });
  }

  /**
   * Crea una nueva User Story.
   * @param userStory - Objeto UserStory con los datos a crear.
   * @returns Un Observable con la UserStory creada.
   */
  createUserStory(userStory: UserStory): Observable<UserStoryResponse> {
    return this.http.post<UserStoryResponse>(this.apiUrl, userStory, {
      headers: this.httpHeaders
    });
  }

  /**
   * Actualiza una User Story existente.
   * @param id - ID de la User Story a actualizar.
   * @param userStory - Objeto UserStory con los datos actualizados.
   * @returns Un Observable con la UserStory actualizada.
   */
  updateUserStory(id: number, userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.apiUrl}/${id}`, userStory, {
      headers: this.httpHeaders
    });
  }

  /**
   * Elimina una User Story por su ID.
   * @param id - ID de la User Story a eliminar.
   * @returns Un Observable de tipo void.
   */
  deleteUserStory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.httpHeaders
    });
  }

  /**
   * Busca una User Story por su ID.
   * @param id - ID de la User Story a buscar.
   * @returns Un Observable con la UserStory encontrada.
   */
  findUserStoryById(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(`${this.apiUrl}/${id}`, {
      headers: this.httpHeaders
    });
  }
}
