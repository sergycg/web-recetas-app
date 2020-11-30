import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredienteService } from '../../services/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente';

@Component({
  selector: 'app-nuevo-ingrediente-modal',
  templateUrl: './nuevo-ingrediente-modal.component.html',
  styleUrls: ['./nuevo-ingrediente-modal.component.css']
})
export class NuevoIngredienteModalComponent {

  titulo: string;
  ingrediente: Ingrediente;
  error: any;

  constructor(public dialogRef: MatDialogRef<NuevoIngredienteModalComponent>,
              protected service: IngredienteService,
              @Inject (MAT_DIALOG_DATA) public data: any) {
                this.titulo = 'Crear Ingrediente';
                this.ingrediente = new Ingrediente();
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.service.listarPorNombre(this.ingrediente.nombre).subscribe(lista => {
      if (lista.length === 0) {
        this.service.crear(this.ingrediente).subscribe(m => {
          console.log(m);
          this.dialogRef.close(m);
        }, err => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        });
      } else {
        this.error = 'ya existe';
      }
    });
  }

}
