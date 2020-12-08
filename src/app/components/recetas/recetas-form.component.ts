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
import { NuevoIngredienteModalComponent } from './nuevo-ingrediente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-recetas-form',
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.css']
})
export class RecetasFormComponent extends CommonFormComponent<Receta, RecetaService> implements OnInit {

  // @ViewChildren('pasotitulo') pasos: QueryList<any>;
  ingredientesFiltrados: Observable<Ingrediente[]>[] = []; // Primera forma de hacerlo
  // ingredientesFiltrados: Ingrediente[][] = []; //// Segunda forma de hacerlo
  myControlIngredientes: FormControl[] = [];
  myControlPasos: FormControl[] = [];
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(service: RecetaService,
              private serviceIngrediente: IngredienteService,
              router: Router,
              route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public dialog: MatDialog) {
      super(service, router, route);
      this.titulo = 'Crear Receta';
      this.model = new Receta();
      this.nombreModel = Receta.name;
      this.redirect = undefined;
  }

  public addPaso(): void {
    this.myControlPasos = [];
    this.model.pasos.push(new Paso());
    this.model.pasos.forEach(() => this.myControlPasos.push(new FormControl()));
    document.getElementById('botonAddPaso').blur();
    this.changeDetectorRef.detectChanges();
    // this.pasos.last.nativeElement.focus();
    document.getElementById('tituloPaso' + (this.model.pasos.length - 1)).focus();
  }

  public removePaso(paso: Paso, index: number): void {
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
        // this.model.pasos = this.model.pasos.filter(p => p.id !== paso.id);
        this.model.pasos.splice(index, 1);
        this.myControlPasos.splice(index, 1);
      }
    });
  }

  public isPasosValidos(): boolean {
    let salida: boolean = true;
    this.model.pasos.forEach(e => {
      if (e.tituloPaso === undefined || e.tituloPaso === ''
          || e.descripcionPaso === undefined || e.descripcionPaso === '') {
        salida = false;
      }
    });
    return salida;
  }

  private addFormControlIngredientes() {
    const nuevo = this.myControlIngredientes.push(new FormControl(''));
    // Primera forma de hacerlo
    this.ingredientesFiltrados.push(this.myControlIngredientes[nuevo - 1].valueChanges
      .pipe(
        map(valor => typeof valor === 'string' ? valor : valor.nombre),
        flatMap(valor => valor ? this.serviceIngrediente.filtrarPorNombre(valor) : this.serviceIngrediente.listar())
      )
    );

    // Segunda forma de hacerlo
    // this.ingredientesFiltrados.push([]);
    // this.myControl[nuevo - 1].valueChanges
    //   .pipe(
    //     map(valor => typeof valor === 'string' ? valor : valor.nombre),
    //     flatMap(valor => valor ? this.serviceIngrediente.listarPorNombre(valor) : this.serviceIngrediente.listar())
    //   ).subscribe(elements => {
    //   this.ingredientesFiltrados[nuevo - 1] = elements as Ingrediente[];
    // });
  }

  public addIngrediente(): void {
    // console.log(this.model);
    this.myControlIngredientes = [];
    this.ingredientesFiltrados = [];
    document.getElementById('botonAddIngrediente').blur();
    const recetaIngredientes: RecetaIngredientes = new RecetaIngredientes();
    recetaIngredientes.ingrediente = new Ingrediente();
    this.model.ingredientes.push(recetaIngredientes);
    this.model.ingredientes.forEach(() => this.addFormControlIngredientes());
    console.log(this.model);
    this.changeDetectorRef.detectChanges();
    // this.pasos.last.nativeElement.focus();
    document.getElementById('ingredienteMedida' + (this.model.ingredientes.length - 1)).focus();
  }

  public removeIngrediente(ingrediente: RecetaIngredientes, index: number): void {
    console.log(index);
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
        // this.model.ingredientes = this.model.ingredientes.filter(i => i.id !== ingrediente.id);
        this.model.ingredientes.splice(index, 1);
        this.ingredientesFiltrados.splice(index, 1);
        this.myControlIngredientes.splice(index, 1);
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

  crearIngredienteBBDD(): void {
    const dialogRef = this.dialog.open(NuevoIngredienteModalComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      // this.animal = result;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m;
          this.titulo = 'Editar ' + this.nombreModel;
          this.model.ingredientes.forEach(() => this.addFormControlIngredientes());
          this.model.pasos.forEach(() => this.myControlPasos.push(new FormControl()));
        });
      }
    });
  }

  mostrarNombre(ingrediente?: Ingrediente): string {
    return ingrediente ? ingrediente.nombre : '';
  }

  seleccionarIngrediente(event: MatAutocompleteSelectedEvent): void {
    const ingrediente = event.option.value as Ingrediente;
    console.log(ingrediente);
    console.log(this.model.ingredientes);
    // if (this.model.ingredientes.some((item) => item.ingrediente.id === ingrediente.id)) {
    //   Swal.fire(
    //     'Error:',
    //     `El ingrediente ${ingrediente.nombre} ya está asignado a la receta`,
    //     'error'
    //   );
      // this.myControlIngredientes[index].setValue(new Ingrediente());
    // }
    // this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
    // console.log(this.myControl[index]);
    // this.lista = this.ingredientesFiltrados;
  }

  // ngAfterViewChecked(): void {
  //   this.pasos.last.nativeElement.focus();
  // }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'warning');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
    } else {
      this.service.subirFoto(this.fotoSeleccionada, this.model.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            const receta = response.receta as Receta;
            this.model.fotoPortada = receta.fotoPortada;

            // this.modalService.notificarUpload.emit(this.);
            Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }


  }
