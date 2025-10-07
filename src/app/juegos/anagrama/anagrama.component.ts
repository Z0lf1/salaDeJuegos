// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { PuntajesService } from '../../services/puntajes.service';

// @Component({
//   selector: 'app-anagrama',
//   templateUrl: './anagrama.component.html',
//   styleUrls: ['./anagrama.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })
// export class AnagramaComponent implements OnInit {
//   palabras: string[] = ['ANGULAR', 'JUEGO', 'COMPONENTE', 'SERVICIO', 'TYPESCRIPT', 'MODULO', 'PROYECTO', 'VARIABLE'];
//   palabraOriginal: string = '';
//   anagrama: string = '';
//   opciones: string[] = [];
//   correcta: string = '';
//   puntos: number = 0;
//   vidas: number = 3;
//   feedback: string = '';
//   esperando: boolean = false;
//   usuario: string = ''; // Usuario logueado
//   puntajes: any[] = []; // Puntajes del juego

//   constructor(private puntajesService: PuntajesService) {}

//   async ngOnInit() {
//     this.usuario = localStorage.getItem('userEmail') || 'Invitado'; // Obtener usuario logueado
//     await this.cargarPuntajes();
//     this.nuevaRonda();
//   }


//   nuevaRonda() {
//     this.feedback = '';
//     this.esperando = false;
//     this.palabraOriginal = this.palabras[Math.floor(Math.random() * this.palabras.length)];
//     this.anagrama = this.generarAnagrama(this.palabraOriginal);

//     const opcionesSet = new Set<string>();
//     opcionesSet.add(this.palabraOriginal);

//     while (opcionesSet.size < 4) {
//       const palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
//       if (palabra !== this.palabraOriginal) {
//         opcionesSet.add(palabra);
//       }
//     }

//     this.opciones = Array.from(opcionesSet).sort(() => Math.random() - 0.5);
//     this.correcta = this.palabraOriginal;
//   }

//   generarAnagrama(palabra: string): string {
//     let arr = palabra.split('');
//     do {
//       arr = arr.sort(() => Math.random() - 0.5);
//     } while (arr.join('') === palabra);
//     return arr.join('');
//   }

//   async responder(opcion: string) {
//     if (this.esperando || this.vidas === 0) return;
//     this.esperando = true;
//     if (opcion === this.correcta) {
//       this.puntos++;
//       this.feedback = '¡Correcto!';
//     } else {
//       this.vidas--;
//       this.feedback = 'Incorrecto';
//     }
//     setTimeout(async () => {
//       if (this.vidas > 0) {
//         this.nuevaRonda();
//       } else {
//         await this.guardarPuntaje(); // Guardar puntaje al finalizar el juego
//         await this.cargarPuntajes(); // Recargar puntajes
//       }
//       this.esperando = false;
//     }, 1200);
//   }
//   async cargarPuntajes() {
//     try {
//       this.puntajes = await this.puntajesService.obtenerPuntajesPorJuego('Anagrama');
//     } catch (error) {
//       console.error('Error al cargar puntajes:', error);
//     }
//   }

//   async guardarPuntaje() {
//     try {
//       const puntosString = this.puntos.toString(); // Convertir puntos a string
//       await this.puntajesService.guardarPuntaje(this.usuario, puntosString, 'Anagrama');
//     } catch (error) {
//       console.error('Error al guardar puntaje:', error);
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AnagramaComponent implements OnInit {
  palabras: string[] = ['ANGULAR', 'JUEGO', 'COMPONENTE', 'SERVICIO', 'TYPESCRIPT', 'MODULO', 'PROYECTO', 'VARIABLE'];
  palabraOriginal: string = '';
  anagrama: string = '';
  opciones: string[] = [];
  correcta: string = '';
  puntos: number = 0;
  vidas: number = 3;
  feedback: string = '';
  esperando: boolean = false;
  usuario: string = '';
  puntajes: any[] = [];

  constructor(private puntajesService: PuntajesService) {}

  async ngOnInit() {
    this.usuario = localStorage.getItem('userEmail') || 'Invitado';
    await this.cargarPuntajes();
    this.nuevaRonda();
  }

  nuevaRonda() {
    this.feedback = '';
    this.esperando = false;
    this.palabraOriginal = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.anagrama = this.generarAnagrama(this.palabraOriginal);

    const opcionesSet = new Set<string>();
    opcionesSet.add(this.palabraOriginal);

    while (opcionesSet.size < 4) {
      const palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
      if (palabra !== this.palabraOriginal) {
        opcionesSet.add(palabra);
      }
    }

    this.opciones = Array.from(opcionesSet).sort(() => Math.random() - 0.5);
    this.correcta = this.palabraOriginal;
  }

  generarAnagrama(palabra: string): string {
    let arr = palabra.split('');
    do {
      arr = arr.sort(() => Math.random() - 0.5);
    } while (arr.join('') === palabra);
    return arr.join('');
  }

  async responder(opcion: string) {
    if (this.esperando || this.vidas === 0) return;
    this.esperando = true;
    if (opcion === this.correcta) {
      this.puntos++;
      this.feedback = '¡Correcto!';
    } else {
      this.vidas--;
      this.feedback = 'Incorrecto';
    }
    setTimeout(async () => {
      if (this.vidas > 0) {
        this.nuevaRonda();
      } else {
        await this.guardarPuntaje();
        await this.cargarPuntajes();
      }
      this.esperando = false;
    }, 1200);
  }

  async cargarPuntajes() {
    try {
      this.puntajes = await this.puntajesService.obtenerPuntajesPorJuego('Anagrama');
    } catch (error) {
      console.error('Error al cargar puntajes:', error);
    }
  }

  async guardarPuntaje() {
    try {
      const puntosString = this.puntos.toString();
      await this.puntajesService.guardarPuntaje(this.usuario, puntosString, 'Anagrama');
    } catch (error) {
      console.error('Error al guardar puntaje:', error);
    }
  }

  // 🔹 Nuevo método: reinicia una nueva partida completa
  nuevaPartida() {
    this.puntos = 0;
    this.vidas = 3;
    this.feedback = '';
    this.nuevaRonda();
  }
}
