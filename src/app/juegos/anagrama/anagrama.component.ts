import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { FormsModule } from '@angular/forms'; // Importa FormsModule para [(ngModel)]

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css'],
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, FormsModule] // Agrega CommonModule y FormsModule aquí
})
export class AnagramaComponent {
  palabras: string[] = ['ANGULAR', 'JUEGO', 'COMPONENTE', 'SERVICIO', 'TYPESCRIPT', 'MODULO', 'PROYECTO', 'VARIABLE'];
  palabraOriginal: string = '';
  anagrama: string = '';
  opciones: string[] = [];
  correcta: string = '';
  puntos: number = 0;
  vidas: number = 3;
  feedback: string = '';
  esperando: boolean = false;

  ngOnInit() {
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

  responder(opcion: string) {
    if (this.esperando || this.vidas === 0) return;
    this.esperando = true;
    if (opcion === this.correcta) {
      this.puntos++;
      this.feedback = '¡Correcto!';
    } else {
      this.vidas--;
      this.feedback = 'Incorrecto';
    }
    setTimeout(() => {
      if (this.vidas > 0) {
        this.nuevaRonda();
      }
      this.esperando = false;
    }, 1200);
  }
}
