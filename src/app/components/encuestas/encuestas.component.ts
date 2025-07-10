import { Component, OnInit } from '@angular/core';
import { EncuestasService } from '../../services/encuestas.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css'],
  imports: [CommonModule] // Importa CommonModule para usar ngFor y otras directivas
})
export class EncuestasComponent implements OnInit {
  encuestas: any[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private encuestasService: EncuestasService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.encuestas = await this.encuestasService.obtenerEncuestas();
    } catch (err) {
      this.error = 'No se pudieron cargar las encuestas.';
    } finally {
      this.cargando = false;
    }
  }
}
