import { Component, OnInit } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent 
extends CommonFormComponent<Examen, ExamenService> implements OnInit {

  constructor(service: ExamenService,
    router: Router,
    route: ActivatedRoute) {
      super(service, router, route);
      this.titulo = 'Crear Examen';
      this.model = new Examen();
      this.nombreModel = Examen.name;
      this.redirect = '/examenes';

     }


}
