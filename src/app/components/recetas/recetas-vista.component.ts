import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../../services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../models/receta';

@Component({
  selector: 'app-recetas-vista',
  templateUrl: './recetas-vista.component.html',
  styleUrls: ['./recetas-vista.component.css']
})
export class RecetasVistaComponent implements OnInit {

  imagen: string;
  model: Receta;

  constructor(private service: RecetaService,
              private route: ActivatedRoute) {
    this.model = new Receta();
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
          if (this.model.fotoPortada != null && this.model.fotoPortada !== undefined && this.model.fotoPortada !== '') {
            this.imagen = 'http://192.168.1.49:8084/recetas/imagen/' + this.model.fotoPortada;
          }
        });
      }
    });
  }

}
