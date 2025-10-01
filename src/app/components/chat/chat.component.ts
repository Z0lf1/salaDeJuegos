import { Component, OnInit, OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { ChatService, Mensaje } from '../../services/chat.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { FormsModule } from '@angular/forms'; // Importa FormsModule para [(ngModel)]

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
styleUrls: ['./chat.component.css'],
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, FormsModule] // Agrega CommonModule y FormsModule aquí
})
export class ChatComponent implements OnInit, OnDestroy {
  mensajes: Mensaje[] = [];
  usuario: string = '';
  mensaje: string = '';
  error: string = '';

  @ViewChild('chatScroll') chatScroll!: ElementRef; // Referencia al contenedor del chat

  constructor(private chatService: ChatService) {}

  async ngOnInit() {
    this.usuario = localStorage.getItem('userEmail') || '';
    await this.cargarMensajes();
    this.chatService.suscribirseMensajes((nuevoMensaje: Mensaje) => {
      this.mensajes.push(nuevoMensaje);
      setTimeout(() => this.scrollToBottom(), 0); // Scroll automático
    });
  }
  ngOnDestroy() {
    this.chatService.desconectar();
  }
  async cargarMensajes() {
    try {
      this.mensajes = await this.chatService.getMensajes();
      setTimeout(() => this.scrollToBottom(), 0); // Scroll automático

    } catch (err: any) {
      this.error = 'Error al cargar mensajes';
    }
  }

  async enviar() {
    if (!this.usuario.trim() || !this.mensaje.trim()) return;
    try {
      await this.chatService.enviarMensaje(this.usuario, this.mensaje);
      this.mensaje = '';
    } catch (err: any) {
      this.error = 'Error al enviar mensaje';
    }
  }
   private scrollToBottom() {
    try {
      const el = this.chatScroll.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (e) {
      console.error('No se pudo hacer scroll:', e);
    }
  }
  // agrega esto dentro de export class ChatComponent { ... }
usuarioEsPropio(autor?: string): boolean {
  const usuarioActual = (this.usuario ?? '').toString().trim().toLowerCase();
  if (!usuarioActual) return false; // si no hay usuario logueado no marcamos como propio
  return ((autor ?? '').toString().trim().toLowerCase()) === usuarioActual;
}

}
