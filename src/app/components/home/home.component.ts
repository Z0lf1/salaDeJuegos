import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; // Importa RouterModule
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true, // Indica que es un componente independiente
  imports: [RouterModule] // Agrega RouterModule aquí
})
export class HomeComponent implements OnInit, OnDestroy {
  userEmail: string | null = null;
  private sub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}