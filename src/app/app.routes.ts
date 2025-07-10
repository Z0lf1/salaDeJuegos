import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegistroComponent } from './components/registro/registro.component'; // Asegúrate de importar el componente Registro
import { AuthGuard } from './guards/auth.guard'; // Asegúrate de que AuthGuard esté importado y configurado
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
      { path: 'chat', component: ChatComponent , canActivate: [AuthGuard] } // Asegúrate de que AuthGuard esté importado y configurado,

    ]
  },
  { path: '**', redirectTo: 'home' }
];