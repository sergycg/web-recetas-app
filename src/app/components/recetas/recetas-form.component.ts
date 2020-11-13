import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonFormComponent } from '../common-form.component';
import { Receta } from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Paso } from '../../models/paso';
import Swal from 'sweetalert2';
import { RecetaIngredientes } from 'src/app/models/receta-ingrediente';
import { Ingrediente } from 'src/app/models/ingrediente';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, flatMap, startWith } from 'rxjs/operators';
import { IngredienteService } from '../../services/ingrediente.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recetas-form',
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.css']
})
export class RecetasFormComponent extends CommonFormComponent<Receta, RecetaService> implements OnInit {

  // @ViewChildren('pasotitulo') pasos: QueryList<any>;
  autocompleteControl: FormControl;
  // ingredientesFiltrados: Ingrediente[];
  ingredientesFiltrados: Observable<Ingrediente[]>[] = [];
  myControl: FormControl[] = [];

  constructor(service: RecetaService,
              private serviceIngrediente: IngredienteService,
              router: Router,
              route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {
      super(service, router, route);
      this.titulo = 'Crear Receta';
      this.model = new Receta();
      this.nombreModel = Receta.name;
      this.redirect = '/recetas';
      this.autocompleteControl = new FormControl();
  }

  public addPaso(): void {
    document.getElementById('botonAddPaso').blur();
    this.model.pasos.push(new Paso());
    this.changeDetectorRef.detectChanges();
    // this.pasos.last.nativeElement.focus();
    document.getElementById('tituloPaso' + (this.model.pasos.length - 1)).focus();
  }

  public removePaso(paso: Paso): void {
    document.getElementById('botonEliminarPaso' + (this.model.pasos.length - 1)).blur();
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${paso.tituloPaso} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.model.pasos = this.model.pasos.filter(p => p.id !== paso.id);
      }
    });
  }

  public isPasosValidos(): boolean {
    // salida: boolean;
    let salida: boolean = true;
    this.model.pasos.forEach(e => {
      if (e.tituloPaso === undefined || e.tituloPaso === ''
          || e.descripcionPaso === undefined || e.descripcionPaso === '') {
        salida = false;
      }
    });
    return salida;
  }

  private addFormControl() {
    const nuevo = this.myControl.push(new FormControl(''));
    this.ingredientesFiltrados.push(this.myControl[nuevo - 1].valueChanges
      .pipe(
        map(valor => typeof valor === 'string' ? valor : valor.nombre),
        flatMap(valor => valor ? this.serviceIngrediente.listarPorNombre(valor) : this.serviceIngrediente.listar())
      )
    );
  }
  public addIngrediente(): void {
    document.getElementById('botonAddIngrediente').blur();
    this.addFormControl();
    const recetaIngredientes: RecetaIngredientes = new RecetaIngredientes();
    recetaIngredientes.ingrediente = new Ingrediente();
    this.model.ingredientes.push(recetaIngredientes);
    this.changeDetectorRef.detectChanges();
    // this.pasos.last.nativeElement.focus();
    document.getElementById('ingredienteMedida' + (this.model.ingredientes.length - 1)).focus();
  }

  public removeIngrediente(ingrediente: RecetaIngredientes, index: number): void {
    document.getElementById('botonEliminarIngrediente' + (this.model.ingredientes.length - 1)).blur();
    Swal.fire({
      title: 'Cuidado:',
      text: `¿Seguro que desea eliminar a ${ingrediente.ingrediente.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.ingredientesFiltrados.splice(index, 1);
        this.myControl.splice(index, 1);
        this.model.ingredientes = this.model.ingredientes.filter(i => i.id !== ingrediente.id);
      }
    });
  }

  public isIngredientesValidos(): boolean {
    let salida: boolean = true;
    this.model.ingredientes.forEach(i => {
      if (i.medida === undefined || i.medida === ''
          || !i.ingrediente || i.ingrediente.nombre === undefined || i.ingrediente.nombre === '') {
        salida = false;
      }
    });
    return salida;
  }

  // ngOnInit() {
  //   this.route.paramMap.subscribe(params => {
  //     const id: number = +params.get('id');
  //     if (id) {
  //       this.service.ver(id).subscribe(m => {
  //         this.model = m;
  //         this.titulo = 'Editar ' + this.nombreModel;
  //       });
  //     }
  //   });

  //   this.serviceIngrediente.listar().subscribe(m => {
  //     this.ingredientesFiltrados = m;
  //   });

  //   this.autocompleteControl.valueChanges.pipe(
  //     map(valor => typeof valor === 'string' ? valor : valor.nombre),
  //     flatMap(valor => valor ? this.serviceIngrediente.listarPorNombre(valor) : [])
  //     ).subscribe(ingredientes => {
  //       // console.log(ingredientes);
  //       this.ingredientesFiltrados = ingredientes as Ingrediente[];
  //     });
  // }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
          this.model.ingredientes.forEach(() => this.addFormControl());
        });
      }
    });
  }

  mostrarNombre(ingrediente?: Ingrediente): string {
    return ingrediente ? ingrediente.nombre : '';
  }

  seleccionarIngrediente(event: MatAutocompleteSelectedEvent): void {
    const ingrediente = event.option.value as Ingrediente;

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

    // this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
    console.log(this.model);
    // this.lista = this.ingredientesFiltrados;
  }



  // ngAfterViewChecked(): void {
  //   this.pasos.last.nativeElement.focus();
  // }

  }
