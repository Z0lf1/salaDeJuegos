import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const email = this.authService.getUserEmail();
    if (!email) {
      this.router.navigate(['/home']); // Redirige si no hay usuario logueado
      return false;
    }

    try {
      const usuario = await this.authService.getUsuarioPorEmail(email);
      if (usuario.perfil === 'administrador') {
        return true; // Permite el acceso si el perfil es administrador
      } else {
        this.router.navigate(['/home']); // Redirige si el perfil no es administrador
        return false;
      }
    } catch (error) {
      console.error('Error al verificar perfil:', error);
      this.router.navigate(['/home']); // Redirige en caso de error
      return false;
    }
  }
}
