import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Examen } from '../models/examen';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends CommonService<Examen>{

  protected baseEndpoint = BASE_ENDPOINT + '/examenes';

  constructor(http: HttpClient) { 
    super(http);
  }
}
