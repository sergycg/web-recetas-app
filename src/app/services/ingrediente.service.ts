import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BASE_ENDPOINT } from '../config/app';
import { Ingrediente } from '../models/ingrediente';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService extends CommonService<Ingrediente> {

  protected baseEndpoint = BASE_ENDPOINT + '/ingredientes';

  constructor(http: HttpClient) {
    super(http);
  }

  // public listarPorNombre(valor: string): Observable<Ingrediente[]> {
  //   return this.http.get<Ingrediente[]>(`${this.baseEndpoint}/filtrar/${valor}`);
  // }
}
