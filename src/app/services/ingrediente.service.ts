import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Ingrediente } from '../models/ingrediente';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService extends CommonService<Ingrediente> {

  protected baseEndpoint = BASE_ENDPOINT + '/ingredientes';

  constructor(http: HttpClient) {
    super(http);
  }

  // public filtrarPorNombre(nombre: string): Observable<Ingrediente[]> {
  //   return this.http.get<Ingrediente[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  // }

  // public filtrarPorNombre(page: string, size: string, valor: string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page)
  //     .set('size', size);
  //   return this.http.get<any>(`${this.baseEndpoint}/pagina/filtrar/${valor}`, { params: params });
  // }
}
