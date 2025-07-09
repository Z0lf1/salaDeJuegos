import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true, // Indica que es un componente independiente
  imports: [FormsModule, CommonModule] // Agrega FormsModule y CommonModule aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  autofill(email: string, password: string): void {
    this.email = email;
    this.password = password;
  }

  async onSubmit(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.error = err.message || 'Error al iniciar sesión';
    }
  }
}
