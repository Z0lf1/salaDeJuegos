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
      // Mensaje en castellano para errores de login (si procede)
      const msg = (error.message || '').toLowerCase();
      if (msg.includes('invalid login') || msg.includes('invalid credentials') || msg.includes('invalid email') || msg.includes('invalid password') || msg.includes('user not found')) {
        throw new Error('Credenciales inválidas. Revisa tu email y contraseña.');
      }
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
      // Normalizar y traducir errores comunes
      const msg = (error.message || '').toLowerCase();

      // Errores de usuario ya registrado
      if (
        msg.includes('already registered') ||
        msg.includes('already exists') ||
        msg.includes('duplicate') ||
        msg.includes('user already') ||
        msg.includes('email already') ||
        msg.includes('user exists')
      ) {
        throw new Error('El usuario ya está registrado');
      }

      // Error de contraseña mínima (variantes posibles)
      if (
        msg.includes('at least 6 characters') ||
        msg.includes('password should be at least') ||
        msg.includes('password must be at least') ||
        msg.includes('minimum length is 6') ||
        msg.includes('password too short') ||
        msg.includes('should be at least 6 characters')
      ) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Error de formato de email
      if (
        msg.includes('invalid email') ||
        msg.includes('email address is not valid') ||
        msg.includes('invalid email address') ||
        msg.includes('malformed email') ||
        msg.includes('email is invalid')
      ) {
        throw new Error('El formato del email no es válido');
      }

      // Error por política de seguridad/contraseña compleja (si aparece)
      if (
        msg.includes('password') && (msg.includes('strength') || msg.includes('complexity') || msg.includes('require'))
      ) {
        throw new Error('La contraseña no cumple con los requisitos de seguridad');
      }

      // Error genérico de validación
      if (msg.includes('invalid') || msg.includes('failed') || msg.includes('error')) {
        throw new Error('Error en la validación de los datos. Revisa los campos y vuelve a intentarlo.');
      }

      // Si no coincide ninguna regla, re-lanzamos el error original
      throw error;
    }

    // Registrar el usuario en la tabla Usuarios con perfil "jugador"
    const { error: insertError } = await this.supabase
      .from('usuarios')
      .insert([{ email, perfil: 'jugador' }]);

    if (insertError) {
      console.error('Error al insertar en la tabla Usuarios:', insertError);
      // traducir error de duplicado en la tabla usuarios
      const insertMsg = (insertError.message || '').toLowerCase();
      if (
        insertMsg.includes('duplicate') ||
        insertMsg.includes('unique') ||
        insertMsg.includes('already exists') ||
        insertMsg.includes('violates unique') ||
        insertMsg.includes('duplicate key')
      ) {
        throw new Error('El usuario ya está registrado');
      }

      // errores comunes al insertar
      if (insertMsg.includes('null value in column') || insertMsg.includes('not null violation')) {
        throw new Error('Falta un campo obligatorio al crear el usuario');
      }

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
      throw new Error('No se pudo obtener el usuario. Intenta de nuevo más tarde.');
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