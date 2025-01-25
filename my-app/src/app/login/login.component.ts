import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Importa Router para realizar la redirección

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router  // Inyecta Router en el constructor
  ) {}

  onSubmit(username: string, password: string): void {
    const isAuthenticated = this.authService.login(username, password);  // Llama al método login directamente

    if (isAuthenticated) {
      console.log('User is authenticated');
      // Redirige al dashboard si la autenticación es exitosa
      this.router.navigate(['/dashboard']);
    } else {
      console.log('User is not authenticated');
    }
  }
}
