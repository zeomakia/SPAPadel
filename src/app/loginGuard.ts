import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si hay un token en la sesión
    if (!sessionStorage.getItem('access_token')) {
      return true; // Permite el acceso a la ruta
    } else {
      this.router.navigate(['/partidas']); // Redirige a la página de inicio de sesión si no hay token
      return false;
    }
  }
}