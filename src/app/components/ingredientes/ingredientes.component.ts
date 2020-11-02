import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent extends CommonListarComponent<Ingrediente, IngredienteService> implements OnInit {

  autocompleteControl = new FormControl();
  // ingredientesFiltrados: Ingrediente[] = [];
  // ingredientesFiltrados: Ingrediente[] = [];

  constructor(service: IngredienteService) {
    super(service);
    this.titulo = 'Listado de Ingredientes';
    this.nombreModel = Ingrediente.name;
   }

   ngOnInit() {
    this.calcularRangos();
    this.autocompleteControl.valueChanges.pipe(
      map(valor => typeof valor === 'string' ? valor : valor.nombre),
      flatMap(valor => valor ? this.service.filtrarPorNombre(this.paginaActual.toString(), this.totalPorPagina.toString(), valor) :
                                this.service.listarPaginas(this.paginaActual.toString(), this.totalPorPagina.toString()))
      ).subscribe(ingredientes => {
        this.lista = ingredientes.content as Ingrediente[];
      });
  }


  // mostrarNombre(ingrediente?: Ingrediente): string {
  //   return ingrediente ? ingrediente.nombre : '';
  // }

  // seleccionarIngrediente(event: MatAutocompleteSelectedEvent): void {
  //   const ingrediente = event.option.value as Ingrediente;

    // if (!this.existe(examen.id)) {
    //   this.examenesAsignar = this.examenesAsignar.concat(examen);

    //   console.log(this.examenesAsignar);
    // } else {
    //   Swal.fire(
    //     'Error:',
    //     `El examen ${examen.nombre} ya está asignado al curso`,
    //     'error'
    //   );
    // }

  //   this.autocompleteControl.setValue('');
  //   event.option.deselect();
  //   event.option.focus();
  //   this.lista = this.ingredientesFiltrados;
  // }

}
