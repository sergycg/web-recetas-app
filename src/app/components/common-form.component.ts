import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Generic } from '../models/generic';

export abstract class CommonFormComponent<E extends Generic, S extends CommonService<E>> implements OnInit {

  titulo: string;
  model: E;
  error: any;
  protected redirect: string;
  protected nombreModel: string;

  constructor(protected service: S,
              protected router: Router,
              protected route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    });
  }

  public crear(): void {
    this.service.listarPorNombre(this.model.nombre).subscribe(lista => {
      console.log(lista);
      if (lista.length === 0) {
        this.service.crear(this.model).subscribe(m => {
          console.log(m);
          Swal.fire('Nuevo:', `${this.nombreModel} ${m.nombre} creado con éxito`, 'success');
          if (this.redirect !== undefined && this.redirect !== '') {
             this.router.navigate([this.redirect]);
          }
        }, err => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      } else {
        Swal.fire('Cuidado:', `${this.model.nombre} ya existe`, 'warning');
      }
    });
  }

  public editar(): void {
    this.service.editar(this.model).subscribe(m => {
      console.log(m);
      Swal.fire('Modificado:', `${this.nombreModel} ${m.nombre} actualizado con éxito`, 'success');
      if (this.redirect !== undefined && this.redirect !== '') {
        this.router.navigate([this.redirect]);
      }
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public guardar(): void {
    this.service.guardar(this.model).subscribe((m) => {
      const mensaje: string = this.model.id ? `Modificado: ${this.nombreModel} ${this.model.nombre} actualizado con éxito` :
      `Nuevo: ${this.nombreModel} ${this.model.nombre} creado con éxito`;
      const accion: string = this.model.id ? 'Modificado:' : 'Nuevo:';
      console.log(mensaje);
      this.model = m;
      Swal.fire(accion, mensaje, 'success');
      if (this.redirect !== undefined && this.redirect !== '') {
        this.router.navigate([this.redirect]);
      }
    }, err => {
      if (err.status === 400) {
        this.error = err.error;
        console.log(this.error);
      }
    });
  }

  public preGuardar(): void {
    this.model.id ? this.guardar()
                  : this.service.listarPorNombre(this.model.nombre)
                  .subscribe(lista => {
                    console.log(lista);
                    if (lista.length === 0) {
                      this.guardar();
                    } else {
                      Swal.fire('Cuidado:', `${this.model.nombre} ya existe`, 'warning');
                    }
                  });
  }

}
