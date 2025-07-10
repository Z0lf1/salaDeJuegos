import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private userEmailSubject = new BehaviorSubject<string | null>(this.getUserEmail());
  userEmail$ = this.userEmailSubject.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async login(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    localStorage.setItem('userEmail', email);
    this.userEmailSubject.next(email);

    // Registrar el login en la tabla Log_Login
    await this.supabase.from('Log_Login').insert([{ Usuario: email }]);

    return data;
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
    localStorage.removeItem('userEmail'); // Elimina el email
    this.userEmailSubject.next(null); // Notifica el cambio
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  async register(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) {
      throw error;
    }

    // Registrar el usuario en la tabla Usuarios con perfil "jugador"
    const { error: insertError } = await this.supabase
      .from('usuarios')
      .insert([{ email, perfil: 'jugador' }]);

    if (insertError) {
      console.error('Error al insertar en la tabla Usuarios:', insertError);
      throw insertError;
    }

    // Inicia sesión automáticamente después de registrarse
    await this.login(email, password);
    return data;
  }

  async getUsuarioPorEmail(email: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .single(); // Obtiene un único registro

    if (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }

    return data;
  }
  async isAdmin(): Promise<boolean> {
    const email = this.getUserEmail();
    if (!email) return false;
  
    try {
      const { data, error } = await this.supabase
        .from('usuarios')
        .select('perfil')
        .eq('email', email)
        .single();
  
      if (error) {
        console.error('Error al verificar perfil de usuario:', error);
        return false;
      }
  
      return data.perfil === 'administrador';
    } catch (err) {
      console.error('Error inesperado al verificar administrador:', err);
      return false;
    }
  }
}