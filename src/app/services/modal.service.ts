import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';

/**
 * Servicio para gestionar modales.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /**
   * Constructor del servicio de modales.
   * @constructor
   * @param {NgbModal} modalService - Servicio de modales de NgbModal.
   */
  constructor(private modalService: NgbModal) {}

  /**
   * Método para abrir un modal de error.
   * @method
   * @param {string} error - Mensaje de error a mostrar en el modal.
   */
  openModalError(error: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mensaje = error; // Pasamos el mensaje al componente del modal
    modalRef.componentInstance.tipo = 'error'; // Indicamos que es un modal de tipo error
  }

  /**
   * Método para abrir un modal de información.
   * @method
   * @param {string} info - Mensaje de información a mostrar en el modal.
   */
  openModalInfo(info: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mensaje = info; // Pasamos el mensaje al componente del modal
    modalRef.componentInstance.tipo = 'info'; // Indicamos que es un modal de tipo info
  }
}
