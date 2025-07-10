import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { AuthGuard } from '../guards/auth.guard'; // Usa la clase AuthGuard

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent, canActivate: [AuthGuard] }, // Usa AuthGuard
  { path: 'mayor-menor', component: MayorMenorComponent, canActivate: [AuthGuard] }, // Usa AuthGuard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
