import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(this.loadAuthState()); // Cargar el estado inicial desde localStorage
  private currentUsername: string | null = this.loadUsername(); // Cargar el username desde localStorage

  // Observable para escuchar cambios en el estado de autenticación
  isAuthenticated$: Observable<boolean> = this.authenticatedSubject.asObservable();

  constructor() {}

  // Método de login
  login(username: string, password: string): boolean {
    if (username === 'master@lemoncode.net' && password === '12345678') {
      this.authenticatedSubject.next(true); // Cambia el estado a autenticado
      this.currentUsername = username; // Guarda el username
      this.saveAuthState(true); // Guardar el estado en localStorage
      this.saveUsername(username); // Guardar el username en localStorage
      return true; // Login exitoso
    } else {
      this.authenticatedSubject.next(false); // Cambia el estado a no autenticado
      this.currentUsername = null; // Limpia el username
      this.saveAuthState(false); // Guardar el estado en localStorage
      this.saveUsername(null); // Limpiar el username en localStorage
      return false; // Login fallido
    }
  }

  // Método de logout
  logout(): void {
    this.authenticatedSubject.next(false); // Cambia el estado a no autenticado
    this.currentUsername = null; // Limpia el username
    this.saveAuthState(false); // Guardar el estado en localStorage
    this.saveUsername(null); // Limpiar el username en localStorage
  }

  // Método para verificar si el usuario está autenticado
  isLogged(): boolean {
    return this.authenticatedSubject.value; // Devuelve el estado actual de autenticación
  }

  // Método para obtener el username del usuario autenticado
  getUsername(): string | null {
    return this.currentUsername;
  }

  // Métodos para guardar y cargar el estado de autenticación y el username desde localStorage
  private saveAuthState(isAuthenticated: boolean): void {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }

  private saveUsername(username: string | null): void {
    localStorage.setItem('username', JSON.stringify(username));
  }

  private loadAuthState(): boolean {
    const storedState = localStorage.getItem('isAuthenticated');
    return storedState ? JSON.parse(storedState) : false; // Si no hay estado guardado, por defecto es false
  }

  private loadUsername(): string | null {
    const storedUsername = localStorage.getItem('username');
    return storedUsername ? JSON.parse(storedUsername) : null; // Si no hay username guardado, por defecto es null
  }
}