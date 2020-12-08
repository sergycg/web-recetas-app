import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetaService extends CommonService<Receta> {

  protected baseEndpoint = BASE_ENDPOINT + '/recetas';

  constructor(http: HttpClient) {
    super(http);
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.baseEndpoint}/imagen/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);

  }
}
