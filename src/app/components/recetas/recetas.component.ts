import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent extends CommonListarComponent<Receta, RecetaService> implements OnInit {

  autocompleteControl = new FormControl();

  constructor(service: RecetaService) {
    super(service);
    this.titulo = 'Listado de Recetas';
    this.nombreModel = Receta.name;
    this.sortByField = 'nombre';
    this.orderedType = 'asc';
   }

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
            ).subscribe(recetas => {
        this.lista = recetas.content as Receta[];
      });
  }

}
