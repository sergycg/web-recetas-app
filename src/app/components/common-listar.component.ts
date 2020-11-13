import { OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';
import { map, flatMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export abstract class CommonListarComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  autocompleteControl: FormControl;
  titulo: string;
  lista: E[];
  protected nombreModel: string;
  protected sortByField: string;
  protected orderedType: string;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 4;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  error: any;

  constructor(protected service: S) { }

  // ngOnInit() {
  //   this.calcularRangos();
  // }

  ngOnInit() {
    this.calcularRangos();
    this.autocompleteControl.valueChanges.pipe(
      map(valor => typeof valor === 'string' ? valor : valor.nombre),
      flatMap(
        valor => valor
                  ?
                  this.service.filtrarPorNombreSortBy(
                      this.paginaActual.toString(), this.totalPorPagina.toString(), valor, this.sortByField, this.orderedType)
                  :
                  this.service.listarPaginasSortBy(
                      this.paginaActual.toString(), this.totalPorPagina.toString(), this.sortByField, this.orderedType))
      ).subscribe(elements => {
        this.lista = elements.content as E[];
      });
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  protected calcularRangos() {
    this.service.listarPaginasSortBy(this.paginaActual.toString(), this.totalPorPagina.toString(), this.sortByField, this.orderedType)
      .subscribe(p => {
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
      });
  }

  public eliminar(e: E): void {

    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.service.eliminar(e.id).subscribe(() => {
          this.calcularRangos();
          Swal.fire('Eliminado:', `${this.nombreModel} ${e.nombre} eliminado con éxito`, 'success');
        }, err => {
          if (err.status === 500) {
            this.error = err.error;
            console.log(this.error);
            if (err.error.message.indexOf('ConstraintViolationException') !== -1) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Parece que ${e.nombre} se está usando!!!`
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo ha ido mal!!!'
              });
            }
          }
        });
      }
    });

  }

}
