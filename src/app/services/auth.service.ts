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
    // Inicia sesión automáticamente después de registrarse
    await this.login(email, password);
    return data;
  }
}