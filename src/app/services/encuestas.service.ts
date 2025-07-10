// encuestas.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async insertEncuesta(encuesta: any) {
    const { data, error } = await this.supabase
      .from('encuestas')
      .insert([encuesta]);

    if (error) {
      throw error;
    }

    return data;
  }
}
