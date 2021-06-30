import { Sucursal } from './../interfaces/sucursales.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;

  getAll(): Observable<Sucursal[]>{
    return this.http.get<Sucursal[]>(`${ this.baseUrl }/tgestiona/sucursales`);
  } 

  get(id: number): Observable<Sucursal>{
    return this.http.get<Sucursal>(`${ this.baseUrl }/tgestiona/sucursal/${id}`);
  } 


  create(model: Sucursal): Observable<{}>{
    return this.http.post(`${ this.baseUrl }/tgestiona/sucursal`, model);
  }

  delete(id: number): Observable<{}> {
    console.log(id);
    return this.http.delete(`${ this.baseUrl }/tgestiona/sucursal/${id}`);
  }

  update(id: number, model: Sucursal): Observable<{}> {
    return this.http.put(`${ this.baseUrl }/tgestiona/sucursal/${id}`, model);
  }
}
