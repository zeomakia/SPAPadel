// modal.service.ts
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModalError(error: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mensaje = error; // Pasamos el mensaje al componente del modal
    modalRef.componentInstance.tipo = 'error'; // Indicamos que es un modal de tipo error
}

openModalInfo(info: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.mensaje = info; // Pasamos el mensaje al componente del modal
    modalRef.componentInstance.tipo = 'info'; // Indicamos que es un modal de tipo info
}
}