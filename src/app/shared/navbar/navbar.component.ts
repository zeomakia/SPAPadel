import { Component } from '@angular/core';

/**
 * Componente Angular para la barra de navegación.
 * @class
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  /**
   * Nombre del usuario.
   * @type {string | undefined}
   */
  user?: string;

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    if (sessionStorage.getItem('user') !== null) {
      this.user = sessionStorage.getItem('user')!;
    }
  }
}
