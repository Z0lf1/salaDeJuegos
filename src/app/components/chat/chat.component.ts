import { Component, OnInit } from '@angular/core';
import { ChatService, Mensaje } from '../../services/chat.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { FormsModule } from '@angular/forms'; // Importa FormsModule para [(ngModel)]

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, FormsModule] // Agrega CommonModule y FormsModule aquí
})
export class ChatComponent implements OnInit {
  mensajes: Mensaje[] = [];
  usuario: string = '';
  mensaje: string = '';
  error: string = '';

  constructor(private chatService: ChatService) {}

  async ngOnInit() {
    // Toma el usuario logueado del localStorage
    this.usuario = localStorage.getItem('userEmail') || '';
    await this.cargarMensajes();
    this.chatService.suscribirseMensajes((nuevoMensaje: Mensaje) => {
      this.mensajes.push(nuevoMensaje);
    });
  }
  ngOnDestroy() {
    this.chatService.desconectar();
  }
  async cargarMensajes() {
    try {
      this.mensajes = await this.chatService.getMensajes();
    } catch (err: any) {
      this.error = 'Error al cargar mensajes';
    }
  }

  async enviar() {
    if (!this.usuario.trim() || !this.mensaje.trim()) return;
    try {
      await this.chatService.enviarMensaje(this.usuario, this.mensaje);
      this.mensaje = '';
      await this.cargarMensajes();
    } catch (err: any) {
      this.error = 'Error al enviar mensaje';
    }
  }
}
