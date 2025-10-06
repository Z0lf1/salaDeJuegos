import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntajesService } from '../../services/puntajes.service';
import { CartasService } from '../../services/cartas.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MayorMenorComponent implements OnInit {
  deckId: string = '';
  cartaActual: any = null;
  cartaSiguiente: any = null;

  mensaje: string = '';
  vidas: number = 5;
  correctos: number = 0;
  usuario: string = '';
  puntajes: any[] = [];

  constructor(private puntajesService: PuntajesService, private cartasService: CartasService) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('userEmail') || 'Invitado';
    this.cargarPuntajes();
    this.iniciarJuego();
  }

  async cargarPuntajes() {
    try {
      this.puntajes = await this.puntajesService.obtenerPuntajesPorJuego('Mayor Menor');
    } catch (error) {
      console.error('Error al cargar puntajes:', error);
    }
  }

  iniciarJuego() {
    this.cartasService.crearMazo().subscribe({
      next: (data) => {
        this.deckId = data.deck_id;
        this.robarCartaInicial();
      },
      error: (err) => console.error('Error al crear mazo:', err)
    });
  }

  robarCartaInicial() {
    this.cartasService.robarCartas(this.deckId, 1).subscribe({
      next: (data) => {
        this.cartaActual = data.cards[0];
      },
      error: (err) => console.error('Error al robar carta inicial:', err)
    });
  }

  robarCartaComparacion(callback: () => void) {
    this.cartasService.robarCartas(this.deckId, 1).subscribe({
      next: (data) => {
        this.cartaSiguiente = data.cards[0];
        callback();
      },
      error: (err) => console.error('Error al robar carta:', err)
    });
  }

  valorNumerico(carta: any): number {
    const mapaValores: Record<string, number> = {
      'ACE': 1,
      'JACK': 11,
      'QUEEN': 12,
      'KING': 13
    };
    return mapaValores[carta.value] || Number(carta.value);
  }

  mapearValor(carta: any): string {
    const mapaValores: Record<string, string> = {
      'ACE': 'As',
      'JACK': 'SOTA',
      'QUEEN': 'REINA',
      'KING': 'REY'
    };
    return mapaValores[carta.value] || carta.value;
  }

  mapearPalo(palo: string): string {
    const mapaPalos: Record<string, string> = {
      'SPADES': 'Picas',
      'HEARTS': 'Corazones',
      'DIAMONDS': 'Diamantes',
      'CLUBS': 'Tréboles'
    };
    return mapaPalos[palo] || palo;
  }

minimo() {
  if (this.vidas <= 0) return;

  if (!this.cartaSiguiente) {
    // Primera vez: robar carta siguiente y mostrarla
    this.robarCartaComparacion(() => {
      this.evaluarComparacion('minimo');
    });
  } else {
    // Reemplazar cartaActual por cartaSiguiente y robar nueva carta
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = null;
    this.robarCartaComparacion(() => {
      this.evaluarComparacion('minimo');
    });
  }
}

maximo() {
  if (this.vidas <= 0) return;

  if (!this.cartaSiguiente) {
    this.robarCartaComparacion(() => {
      this.evaluarComparacion('maximo');
    });
  } else {
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = null;
    this.robarCartaComparacion(() => {
      this.evaluarComparacion('maximo');
    });
  }
}

// Función que evalúa la comparación según el tipo de botón
evaluarComparacion(tipo: 'minimo' | 'maximo') {
  const valorActual = this.valorNumerico(this.cartaActual);
  const valorSiguiente = this.valorNumerico(this.cartaSiguiente);

  if ((tipo === 'minimo' && valorSiguiente < valorActual) ||
      (tipo === 'maximo' && valorSiguiente > valorActual)) {
    this.mensaje = '¡Correcto!';
    this.correctos++;
  } else if (valorSiguiente === valorActual) {
    this.mensaje = 'Empate!';
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
      await this.cargarPuntajes();
    } catch (error) {
      console.error('Error al guardar el puntaje:', error);
    }
  }
nuevaRonda() {
  this.vidas = 5;
  this.correctos = 0;
  this.mensaje = '';
  this.cartaActual = null;
  this.cartaSiguiente = null;

  // Robar una carta inicial para comenzar la nueva ronda
  this.robarCartaInicial();
}

  verificarFinJuego() {
    if (this.vidas <= 0) {
      this.mensaje = `🎮 Fin del juego. Puntos obtenidos: ${this.correctos}`;
      this.guardarPuntaje();
    }
  }
}
