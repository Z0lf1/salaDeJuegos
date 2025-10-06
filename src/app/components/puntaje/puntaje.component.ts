import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PuntajesService } from '../../services/puntajes.service';

@Component({
  selector: 'app-puntaje',
  imports: [CommonModule],
  templateUrl: './puntaje.component.html',
  styleUrl: './puntaje.component.css'
})
export class PuntajeComponent implements OnInit {
  puntajes: any[] = [];
  puntajesPorJuego: Record<string, any[]> = {};
  juegos: string[] = ['Mayor Menor', 'Ahorcado', 'Anagrama', 'Preguntados'];
  cargando = true;
  error: string | null = null;

  constructor(private puntajesService: PuntajesService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.puntajes = await this.puntajesService.obtenerTodosLosPuntajes();
      this.juegos.forEach(juego => {
        this.puntajesPorJuego[juego] = this.puntajes
          .filter(p => p.juego === juego)
          .sort((a, b) => b.puntos - a.puntos)
          .slice(0, 5);
      });
    } catch (err) {
      this.error = 'No se pudieron cargar los puntajes.';
    } finally {
      this.cargando = false;
    }
  }

}
