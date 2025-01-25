import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-private-header',
  standalone: false,
  
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss'
})
export class PrivateHeaderComponent implements OnInit {
  isLoggedIn: boolean = false;  // Variable para saber si el usuario está logueado
  username: string | null = null; // Variable para almacenar el username

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isLoggedIn = authStatus; // Actualizar el estado de la autenticación
      if (this.isLoggedIn) {
        this.username = this.authService.getUsername(); // Obtener el username cuando el usuario está logueado
      } else {
        this.username = null; // Limpiar el username cuando no está logueado
      }
    });
  }

  logout(): void {
    this.authService.logout();  // Llamar al servicio de logout
  }
}
