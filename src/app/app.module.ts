import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { IngredientesFormComponent } from './components/ingredientes/ingredientes-form.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RecetasFormComponent } from './components/recetas/recetas-form.component';
import { NuevoIngredienteModalComponent } from './components/recetas/nuevo-ingrediente-modal.component';
import { RecetasVistaComponent } from './components/recetas/recetas-vista.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientesComponent,
    IngredientesFormComponent,
    RecetasComponent,
    RecetasFormComponent,
    NuevoIngredienteModalComponent,
    RecetasVistaComponent
  ],
  entryComponents: [ NuevoIngredienteModalComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
