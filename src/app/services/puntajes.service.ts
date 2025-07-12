import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  // Obtener puntajes filtrados por juego
  async obtenerPuntajesPorJuego(juego: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('Puntajes')
      .select('*')
      .eq('juego', juego)
      .order('puntaje', { ascending: false }); // Ordenar por puntaje descendente

    if (error) {
      console.error('Error al obtener puntajes:', error);
      throw error;
    }

    return data || [];
  }
async obtenerTodosLosPuntajes(): Promise<any[]> {
  const { data, error } = await this.supabase
    .from('Puntajes')
    .select('*')
    .order('puntaje', { ascending: false });

  if (error) {
    console.error('Error al obtener todos los puntajes:', error);
    throw error;
  }

  return data || [];
}

  // Guardar un nuevo puntajes
  async guardarPuntaje(usuario: string, puntaje: string, juego: string): Promise<void> {
    const { error } = await this.supabase
      .from('Puntajes')
      .insert([{ usuario, puntaje, juego }]);

    if (error) {
      console.error('Error al guardar puntaje:', error);
      throw error;
    }
  }
}
