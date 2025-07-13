import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { RealtimeChannel } from '@supabase/supabase-js';
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
    this.canalMensajes = this.supabase.channel('mensajes-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat' },
        (payload) => {
          callback(payload.new as Mensaje);
        }
      )
      .subscribe();
  }
    desconectar() {
    if (this.canalMensajes) {
      this.supabase.removeChannel(this.canalMensajes);
    }
  }

}