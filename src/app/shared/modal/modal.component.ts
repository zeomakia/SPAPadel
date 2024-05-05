import { Component, Input } from '@angular/core';

/**
 * Componente Angular para mostrar un modal.
 * @class
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  /**
   * Mensaje a mostrar en el modal.
   * @type {string | undefined}
   */
  @Input() mensaje?: string; // Recibimos el mensaje

  /**
   * Tipo de mensaje.
   * @type {string | undefined}
   */
  @Input() tipo?: string; // Recibimos el tipo de mensaje
}
