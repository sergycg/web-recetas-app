import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { IngredientesFormComponent } from './components/ingredientes/ingredientes-form.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RecetasFormComponent } from './components/recetas/recetas-form.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'recetas'},
  {path: 'ingredientes', component: IngredientesComponent},
  {path: 'ingredientes/form', component: IngredientesFormComponent},
  {path: 'ingredientes/form/:id', component: IngredientesFormComponent},
  {path: 'recetas', component: RecetasComponent},
  {path: 'recetas/form', component: RecetasFormComponent},
  {path: 'recetas/form/:id', component: RecetasFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
