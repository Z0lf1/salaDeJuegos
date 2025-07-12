import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegistroComponent } from './components/registro/registro.component'; // Asegúrate de importar el componente Registro
import { AuthGuard } from './guards/auth.guard'; // Asegúrate de que AuthGuard esté importado y configurado
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { PuntajeComponent } from './components/puntaje/puntaje.component'; // Asegúrate de importar el componente Puntajes
import { AdminGuard } from './guards/admin.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: CatalogoComponent },
      { path: 'quien-soy', component: QuienSoyComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) }, 
      { path: 'chat', component: ChatComponent , canActivate: [AuthGuard] }, // Asegúrate de que AuthGuard esté importado y configurado,
      { path: 'encuesta', component: EncuestaComponent , canActivate: [AuthGuard] }, // Asegúrate de que AuthGuard esté importado y configurado
      { path: 'encuestas', component: EncuestasComponent , canActivate: [AdminGuard] }, // Asegúrate de que AuthGuard esté importado y configurado
      { path: 'puntaje', component: PuntajeComponent , canActivate: [AuthGuard] } // Asegúrate de que AuthGuard esté importado y configurado

   
    ]
  },
  { path: '**', redirectTo: 'home' }
];