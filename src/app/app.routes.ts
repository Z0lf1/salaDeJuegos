import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

import { RegistroComponent } from './components/registro/registro.component'; // Asegúrate de importar el componente Registro

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
      { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule) } 
     
    ]
  },
  { path: '**', redirectTo: 'home' }
];