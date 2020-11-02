import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../../models/ingrediente';
import { IngredienteService } from '../../services/ingrediente.service';
import { CommonFormComponent } from '../common-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingredientes-form',
  templateUrl: './ingredientes-form.component.html',
  styleUrls: ['./ingredientes-form.component.css']
})
export class IngredientesFormComponent extends CommonFormComponent<Ingrediente, IngredienteService> implements OnInit {

  constructor(service: IngredienteService,
              router: Router,
              route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear Ingrediente';
      this.model = new Ingrediente();
      this.nombreModel = Ingrediente.name;
      this.redirect = '/ingredientes';

     }

}
