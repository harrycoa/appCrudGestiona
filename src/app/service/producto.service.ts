import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  private baseUrl: string = environment.baseUrl;

  getAll(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${ this.baseUrl }/tgestiona/productos`);
  } 

  get(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${ this.baseUrl }/tgestiona/producto/${id}`);
  } 


  create(model: Producto): Observable<{}>{
    return this.http.post(`${ this.baseUrl }/tgestiona/producto`, model);
  }

  delete(id: number): Observable<{}> {
    console.log(id);
    return this.http.delete(`${ this.baseUrl }/tgestiona/producto/${id}`);
  }

  update(id: number, model: Producto): Observable<{}> {
    return this.http.put(`${ this.baseUrl }/tgestiona/producto/${id}`, model);
  }
}
