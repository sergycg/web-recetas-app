import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

export abstract class CommonService<E extends Generic> {

  protected baseEndpoint: string;

  protected cabeceras: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient) { }

  public listar(): Observable<E[]> {
    return this.http.get<E[]>(this.baseEndpoint);
  }

  public listarPaginas(page: string, size: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
  }

  public listarPaginasSortBy(page: string, size: string, sortby: string, ordered: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sortby + ',' + ordered);
    return this.http.get<any>(`${this.baseEndpoint}/pagina`, { params: params });
  }

  public filtrarPorNombrePage(page: string, size: string, valor: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.baseEndpoint}/pagina/filtrar/${valor}`, { params: params });
  }

  public filtrarPorNombrePageSortBy(page: string, size: string, valor: string, sortby: string, ordered: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sortby + ',' + ordered);
    return this.http.get<any>(`${this.baseEndpoint}/pagina/filtrar/${valor}`, { params: params });
  }

  public listarPorNombre(valor: string): Observable<E[]> {
    return this.http.get<E[]>(`${this.baseEndpoint}/nombre/${valor}`);
  }

  public filtrarPorNombre(valor: string): Observable<E[]> {
    return this.http.get<E[]>(`${this.baseEndpoint}/filtrar/${valor}`);
  }

  public ver(id: number): Observable<E> {
    return this.http.get<E>(`${this.baseEndpoint}/${id}`);
  }

  public crear(e: E): Observable<E> {
    return this.http.post<E>(this.baseEndpoint, e,
      { headers: this.cabeceras });
  }

  public editar(e: E): Observable<E> {
    return this.http.put<E>(`${this.baseEndpoint}/${e.id}`, e,
      { headers: this.cabeceras });
  }

  public guardar(e: E): Observable<E> {
    return this.http.post<E>(this.baseEndpoint, e,
      { headers: this.cabeceras });
  }

  public eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
