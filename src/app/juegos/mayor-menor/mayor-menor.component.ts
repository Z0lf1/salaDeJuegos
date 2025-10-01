import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MayorMenorComponent implements OnInit {
  actual: number;
  next: number;
  actualMax: boolean = false;
  mensaje: string = '';
  vidas: number = 5;
  correctos: number = 0;
  usuario: string = ''; 

  // ✅ Nueva variable para tabla de puntajes de este juego
  puntajes: any[] = [];

  constructor(private puntajesService: PuntajesService) {
    this.actual = this.getRandomArbitrary();
    this.next = this.getRandomArbitrary();
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('userEmail') || 'Invitado';
    this.cargarPuntajes(); // ✅ Cargar tabla de puntajes al iniciar
  }

  // ✅ Nuevo método para traer puntajes solo de "Mayor Menor"
  async cargarPuntajes() {
    try {
      this.puntajes = await this.puntajesService.obtenerPuntajesPorJuego('Mayor Menor');
    } catch (error) {
      console.error('Error al cargar puntajes:', error);
    }
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
      this.correctos++;
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
      this.correctos++;
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
      console.log('Puntaje guardado exitosamente');
      await this.cargarPuntajes(); // ✅ Actualiza la tabla tras guardar puntaje
    } catch (error) {
      console.error('Error al guardar el puntaje:', error);
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
