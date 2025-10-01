import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
  imports: [CommonModule],
})
export class AhorcadoComponent implements OnInit {
  palabras: Array<string> = [
    'PARAGUAS', 'CAMARA', 'PERSONA',
    'CARAMELO', 'AHORCADO', 'PALABRA',
    'JUEGO', 'ANGULAR', 'PROGRAMACION',
    'DESARROLLO', 'COMPUTADORA',
    'TELEFONO', 'LIBRO', 'MUSICA',
    'CINE', 'VIDEOJUEGO', 'DEPORTES',
    'FUTBOL', 'BALONCESTO', 'NATACION','CANCHA'
  ];
  numero: number = Math.floor(Math.random() * this.palabras.length);
  palabra: string = this.palabras[this.numero];
  palabraOculta: string = '';
  puntaje: number = 0;
  intentos = 0;
  usuario: string = '';
  gano = false;
  perdio = false;
  ultimoCambio: string = '';
  letras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
    'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'
  ];
  imagenes: string[] = [
    'assets/ahorcado0.png',
    'assets/ahorcado1.png',
    'assets/ahorcado2.png',
    'assets/ahorcado3.png',
    'assets/ahorcado4.png',
    'assets/ahorcado5.png',
    'assets/ahorcado6.png'
  ];
  letrasUsadas: Set<string> = new Set();

  // ✅ Nueva variable para tabla de puntajes de este juego
  puntajes: any[] = [];

  constructor(private puntajesService: PuntajesService) {
    this.palabraOculta = '_ '.repeat(this.palabra.length);
  }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('userEmail') || 'Invitado';
    this.cargarPuntajes(); // ✅ Cargar tabla al inicio
  }

  // ✅ Nuevo método para traer puntajes solo de este juego
  async cargarPuntajes() {
    try {
      this.puntajes = await this.puntajesService.obtenerPuntajesPorJuego('Ahorcado');
    } catch (error) {
      console.error('Error al cargar puntajes:', error);
    }
  }

  comprobar(letra: string) {
    if (this.letrasUsadas.has(letra) || this.gano || this.perdio) {
      return;
    }
    this.letrasUsadas.add(letra);
    const letraExistente = this.existeLetra(letra);
    const palabraOcultaArr = this.palabraOculta.split(' ');

    if (letraExistente) { 
      this.puntaje += 10; 
      this.ultimoCambio = '+10';
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          palabraOcultaArr[i] = letra;
        }
      }
    } else {
      this.puntaje = Math.max(this.puntaje - 5, 0);
      this.ultimoCambio = '-5';
    }

    this.palabraOculta = palabraOcultaArr.join(' ');
    this.verificaGane();
  }

  verificaGane() {
    const palabraEvaluar = this.palabraOculta.replace(/ /g, '');
    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      this.puntaje += 50; // Bonus por ganar
      this.guardarPuntaje();
    }

    if (this.intentos >= 6) {
      this.perdio = true;
      this.guardarPuntaje();
    }
  }

  existeLetra(letra: string): boolean {
    if (this.palabra.indexOf(letra) >= 0) {
      console.log('La letra ' + letra + ' existe');
      return true;
    } else {
      console.log('La letra ' + letra + ' no existe');
      this.intentos++;
      return false;
    }
  }

  async guardarPuntaje() {
    try {
      const puntosString = this.puntaje.toString();
      await this.puntajesService.guardarPuntaje(this.usuario, puntosString, 'Ahorcado');
      console.log('Puntaje guardado exitosamente');
      await this.cargarPuntajes(); // ✅ Actualiza la tabla tras guardar puntaje
    } catch (error) {
      console.error('Error al guardar el puntaje:', error);
    }
  }
}
