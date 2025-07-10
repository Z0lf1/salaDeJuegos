import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { AuthGuard } from '../guards/auth.guard'; 
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { AnagramaComponent } from './anagrama/anagrama.component';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent, canActivate: [AuthGuard] }, // Usa AuthGuard
  { path: 'mayor-menor', component: MayorMenorComponent, canActivate: [AuthGuard] }, // Usa AuthGuard
  { path: 'preguntados', component: PreguntadosComponent, canActivate: [AuthGuard] }, // Usa AuthGuard
  { path: 'anagrama', component: AnagramaComponent, canActivate: [AuthGuard] }, // Usa AuthGuard


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
