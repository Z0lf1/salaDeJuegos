import { Injectable } from '@angular/core';
import { createClient, SupabaseClient,RealtimeChannel } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
export interface Mensaje {
  id?: number;
  created_at?: string;
  usuario: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;
  private canalMensajes: RealtimeChannel | null = null;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl,environment.supabaseAnonKey);
  }

  // Obtener todos los mensajes
  async getMensajes(): Promise<Mensaje[]> {
    const { data, error } = await this.supabase
      .from('chat')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data as Mensaje[];
  }

  // Enviar un nuevo mensaje
  async enviarMensaje(usuario: string, mensaje: string): Promise<void> {
    const { error } = await this.supabase
      .from('chat')
      .insert([{ usuario, mensaje }]);
    if (error) throw error;
  }

  suscribirseMensajes(callback: (nuevoMensaje: Mensaje) => void) {
   if(this.canalMensajes) {
    this.supabase.removeChannel(this.canalMensajes);
  }

    this.canalMensajes = this.supabase.channel('mensajes-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat' },
        (payload) => {
          const nuevoMensaje = payload.new as Mensaje;
          callback(nuevoMensaje);
        }
      )
      .subscribe((status)=> {
        if (status === 'SUBSCRIBED') {
          console.log('Suscrito a los mensajes del chat');
        }else{  console.warn('Error al suscribirse a los mensajes del chat:', status);
         }});
  }
    desconectar() {
    if (this.canalMensajes) {
      this.supabase.removeChannel(this.canalMensajes);
    }
  }

}