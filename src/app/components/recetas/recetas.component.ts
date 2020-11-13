import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent extends CommonListarComponent<Receta, RecetaService> implements OnInit {

  constructor(service: RecetaService) {
    super(service);
    this.titulo = 'Listado de Recetas';
    this.nombreModel = Receta.name;
    this.sortByField = 'nombre';
    this.orderedType = 'asc';
    this.autocompleteControl = new FormControl();
   }

}
