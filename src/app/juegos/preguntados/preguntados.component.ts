import { Component, OnInit, Injector } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { PuntajesService } from '../../services/puntajes.service';
@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule] // Agrega HttpClientModule aquí
})
export class PreguntadosComponent implements OnInit {
  pokemones: any[] = [];
  opciones: any[] = [];
  respuestaCorrecta: any | null = null;
  imagenUrl: string = '';
  loading: boolean = false;
  puntos: number = 0;
  vidas: number = 3;
  feedback: string = '';
  esperando: boolean = false;
  usuario: string = '';


  /*constructor(private injector: Injector) {

    this.pokeapi = this.injector.get(PokeapiService); // Obtén el servicio dinámicamente
  }*/
constructor(
  private pokeapi: PokeapiService,
  private puntajesService: PuntajesService
) {}

  ngOnInit() {
    this.pokeapi.getPrimeros151().subscribe(data => {
      this.pokemones = data.results;
      this.generarPregunta();
    });
  }

  generarPregunta() {
    this.feedback = '';
    this.esperando = false;
    this.opciones = [];
    const copia = [...this.pokemones];
    for (let i = 0; i < 4; i++) {
      const idx = Math.floor(Math.random() * copia.length);
      this.opciones.push(copia.splice(idx, 1)[0]);
    }
    this.respuestaCorrecta = this.opciones[Math.floor(Math.random() * 4)];
    this.cargarImagen();
  }

  cargarImagen() {
    if (!this.respuestaCorrecta) return;
    this.loading = true;
    const match = this.respuestaCorrecta.url.match(/\/pokemon\/(\d+)\//);
    const numero = match ? match[1] : null;
    if (numero) {
      this.pokeapi.getPokemonPorNumero(+numero).subscribe(data => {
        this.imagenUrl = data.sprites.front_default;
        this.loading = false;
      });
    }
  }

  responder(poke: any) {
    if (this.esperando) return;
    this.esperando = true;
    if (poke === this.respuestaCorrecta) {
      this.puntos++;
      this.feedback = '¡Correcto!';
    } else {
      this.vidas--;
      this.feedback = 'Incorrecto';
    }
    setTimeout(() => {
      if (this.vidas > 0) {
        this.generarPregunta();
      }else{
        this.guardarPuntaje();
      }
      this.esperando = false;
    }, 1200);
  }
  async guardarPuntaje() {
    try {
      const puntosString = this.puntos.toString();
      await this.puntajesService.guardarPuntaje(this.usuario, puntosString, 'Preguntados');
      console.log('Puntaje guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el puntaje:', error);
    }
  } 
}
