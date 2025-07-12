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
  cargando = true;
  error: string | null = null;

  constructor(private puntajesService: PuntajesService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.puntajes = await this.puntajesService.obtenerTodosLosPuntajes();
    } catch (err) {
      this.error = 'No se pudieron cargar los puntajes.';
    } finally {
      this.cargando = false;
    }
  }

}
