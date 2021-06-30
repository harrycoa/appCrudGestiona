import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;

  getUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${ this.baseUrl }/tgestiona/usuarios`);
  } 

  getUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${ this.baseUrl }/tgestiona/usuario/${id}`);
  } 


  createUser(model: Usuario): Observable<{}>{
    return this.http.post(`${ this.baseUrl }/tgestiona/usuario`, model);
  }

  deleteUser(id: number): Observable<{}> {
    console.log(id);
    return this.http.delete(`${ this.baseUrl }/tgestiona/usuario/${id}`);
  }

  updateUser(id: number, model: Usuario): Observable<{}> {
    return this.http.put(`${ this.baseUrl }/tgestiona/usuarios/${id}`, model);
  }





}
