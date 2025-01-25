import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';  // Importa el servicio de autenticación
import { Router } from '@angular/router';  // Si necesitas redirigir

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;  // Estado de autenticación

  constructor(
    private authService: AuthService,  // Inyecta el servicio de autenticación
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authStatus => {
      this.isLoggedIn = authStatus;  // Actualiza el estado de la autenticación
    });
  }

  login() {
    // Lógica de login
    const username = 'master@lemoncode.net';  // Usa un valor adecuado para login
    const password = '12345678';
    const success = this.authService.login(username, password);
    if (success) {
      this.router.navigate(['/dashboard']);  // Redirige al dashboard si el login es exitoso
    } else {
      console.log('Login fallido');
    }
  }

  logout() {
    // Lógica de logout
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige a la página de login después de cerrar sesión
  }
}
