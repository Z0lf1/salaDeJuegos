import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true, // Indica que es un componente independiente
  imports: [RouterModule, CommonModule] // Agrega RouterModule y CommonModule aquí
})
export class HomeComponent implements OnInit, OnDestroy {
  userEmail: string | null = null;
  esAdmin:boolean = false;
  private sub: Subscription | undefined;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.sub = this.authService.userEmail$.subscribe( async email => {
      this.userEmail = email;
      if(email){
        this.esAdmin = await this.authService.isAdmin();
      }else{
        this.esAdmin = false;
      }
      console.log('Email del usuario:', this.userEmail);
      
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