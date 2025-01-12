import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/userModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://prueba-backend-jhon.up.railway.app/api/user'; // Cambia por la URL de tu API
  private authHeader = `Basic ${btoa('admin:1234')}`; // Credenciales de autenticación básica

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, {
      headers: new HttpHeaders({ Authorization: this.authHeader })
    });
  }

  // Buscar usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: this.authHeader })
    });
  }

  // Buscar usuario por nombre de usuario
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/find/${username}`, {
      headers: new HttpHeaders({ Authorization: this.authHeader })
    });
  }

  createUser(user: User): Observable<User> {
    // Codificar las credenciales en base64 (admin:1234)
    const credentials = btoa('admin:1234');
    
    return this.http.post<User>(this.apiUrl, user, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      })
    });
  }

  // Actualizar usuario
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, {
      headers: new HttpHeaders({
        Authorization: this.authHeader,
        'Content-Type': 'application/json'
      })
    });
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: this.authHeader })
    });
  }

  // Login
  login(username: string, password: string): Observable<string> {
    const loginUrl = `${this.apiUrl}/login`;
    const loginBody = { username, password };

    return this.http.post<string>(loginUrl, loginBody, {
      headers: new HttpHeaders({
        Authorization: this.authHeader,
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' // Asegura que se maneje como texto
    });
  }
}
