import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PuntajesService } from '../../services/puntajes.service';
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
  usuario: string = ''; 
  
  constructor(private puntajesService: PuntajesService) {
    this.actual = this.getRandomArbitrary();
    this.next = this.getRandomArbitrary();
  }
   ngOnInit(): void {
    this.usuario = localStorage.getItem('userEmail') || 'Invitado';
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
    this.verificarFinJuego();
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
    this.verificarFinJuego();
  }
async guardarPuntaje() {
    try {
      const puntosString = this.correctos.toString();
      await this.puntajesService.guardarPuntaje(this.usuario, puntosString, 'Mayor Menor');
      console.log(' Puntaje guardado exitosamente');
    } catch (error) {
      console.error(' Error al guardar el puntaje:', error);
    }
  }
  getRandomArbitrary() {
    return Math.floor(Math.random() * 12 + 1);
  }

  verificarFinJuego() {
    if (this.vidas <= 0) {
      this.mensaje = `🎮 Fin del juego. Puntos obtenidos: ${this.correctos}`;
      this.guardarPuntaje();
    }
  }
  
}