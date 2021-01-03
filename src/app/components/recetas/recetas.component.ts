import { Component, OnInit } from '@angular/core';
import { CommonListarComponent } from '../common-listar.component';
import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BASE_ENDPOINT } from '../../config/app';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent extends CommonListarComponent<Receta, RecetaService> implements OnInit {

  baseEndpoint: string = BASE_ENDPOINT;

  constructor(service: RecetaService, public authService: AuthService) {
    super(service);
    this.titulo = 'Listado de Recetas';
    this.nombreModel = 'Receta';
    this.sortByField = 'nombre';
    this.orderedType = 'asc';
    this.autocompleteControl = new FormControl();
   }

}
