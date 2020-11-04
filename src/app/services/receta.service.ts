import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetaService extends CommonService<Receta>{

  protected baseEndpoint = BASE_ENDPOINT + '/recetas';

  constructor(http: HttpClient) {
    super(http);
  }
}
