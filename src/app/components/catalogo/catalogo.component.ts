import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule] // Agrega CommonModule aquí
})
export class CatalogoComponent {
  juegos = [
    {
      nombre: 'Ahorcado',
      ruta: '/home/juegos/ahorcado',
      imagen: 'assets/ahorcado.png'
    },
    {
      nombre: 'Mayor o Menor',
      ruta: '/home/juegos/mayor-menor',
      imagen: 'assets/mayor-menor.png'
    },
    {
      nombre: 'Preguntados',
      ruta: '/home/juegos/preguntados',
      imagen: 'assets/preguntados.png'
    },
    {
      nombre: 'Anagrama',
      ruta: '/home/juegos/anagrama',
      imagen: 'assets/anagrama.png'
    }
  ];

  constructor(private router: Router) {}

  jugar(ruta: string) {
    this.router.navigate([ruta]);
  }
}