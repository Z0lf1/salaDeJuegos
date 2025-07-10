import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule] // Agrega CommonModule aquí
})
export class MayorMenorComponent {
  actual: number;
  next: number;
  actualMax: boolean = false;
  mensaje: string = '';
  vidas: number = 5;
  correctos: number = 0;

  constructor() {
    this.actual = this.getRandomArbitrary();
    this.next = this.getRandomArbitrary();
  }

  calcular() {
    if (this.actual > this.next) {
      this.actualMax = true;
    }

    this.actual = this.next;
    this.next = this.getRandomArbitrary();
  }

  minimo() {
    this.calcular();
    if (this.actualMax) {
      this.mensaje = '¡Correcto!';
      this.correctos++; // Suma correctos
      this.actualMax = false;
    } else {
      this.mensaje = 'Incorrecto';
      this.vidas--;
    }
  }

  maximo() {
    this.calcular();
    if (!this.actualMax) {
      this.mensaje = '¡Correcto!';
      this.correctos++; // Suma correctos
      this.actualMax = false;
    } else {
      this.mensaje = 'Incorrecto';
      this.vidas--;
    }
  }

  getRandomArbitrary() {
    return Math.floor(Math.random() * 12 + 1);
  }
}