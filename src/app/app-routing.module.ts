import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { IngredientesFormComponent } from './components/ingredientes/ingredientes-form.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { RecetasFormComponent } from './components/recetas/recetas-form.component';
import { RecetasVistaComponent } from './components/recetas/recetas-vista.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'recetas'},
  {path: 'ingredientes', component: IngredientesComponent},
  {path: 'ingredientes/form', component: IngredientesFormComponent,
          canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN', route: '/ingredientes'}},
  {path: 'ingredientes/form/:id', component: IngredientesFormComponent,
          canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN', route: '/ingredientes'}},
  {path: 'recetas', component: RecetasComponent},
  {path: 'recetas/vista/:id', component: RecetasVistaComponent},
  {path: 'recetas/form', component: RecetasFormComponent,
          canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN', route: '/recetas'}},
  {path: 'recetas/form/:id', component: RecetasFormComponent,
          canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN', route: '/recetas'}},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
