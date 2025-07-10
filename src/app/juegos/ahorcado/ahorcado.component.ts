import { Component } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {
  palabras:Array<string> = ['PARAGUAS', 'CAMARA', 'PERSONA',
    'CARAMELO', 'AHORCADO', 'PALABRA',
    'JUEGO', 'ANGULAR', 'PROGRAMACION',
    'DESARROLLO', 'COMPUTADORA',
    'TELEFONO', 'LIBRO', 'MUSICA',
    'CINE', 'VIDEOJUEGO', 'DEPORTES',
    'FUTBOL', 'BALONCESTO', 'NATACION'
  ];
    numero:number = Math.floor(Math.random() * (this.palabras.length - 0));
    palabra:string = this.palabras[this.numero]
    palabraOculta:string = '';

    intentos = 0;

    gano = false;
    perdio = false;

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

    constructor() {
      this.palabraOculta = '_ '.repeat( this.palabra.length );
    }

    comprobar( letra:string ) {
      if (this.letrasUsadas.has(letra) ||  this.gano || this.perdio) {
        return;
      }
      this.letrasUsadas.add(letra);

      this.existeLetra(letra);
      const palabraOcultaArr = this.palabraOculta.split(' ');

      for (let i = 0; i < this.palabra.length; i++) {
        if ( this.palabra[i] === letra ) {
          palabraOcultaArr[i] = letra;
        }
      }
      this.palabraOculta = palabraOcultaArr.join(' ');
      this.verificaGane();
    }

    verificaGane() {
      const palabraArr = this.palabraOculta.split(' ');
      const palabraEvaluar = palabraArr.join('');

      if ( palabraEvaluar === this.palabra ) {
        this.gano = true;
      }

      if ( this.intentos >= 6 ){
        this.perdio = true;
      }
    }

    existeLetra( letra:string ) {
      if ( this.palabra.indexOf( letra ) >= 0) {
        console.log('La letra ' + letra + ' existe');
      } else {
        console.log('La letra ' + letra + ' no existe');
        this.intentos++;
      }
    }

    ngOnInit(): void {
    }
}