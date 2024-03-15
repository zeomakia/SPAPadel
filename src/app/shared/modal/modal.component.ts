// modal.component.ts
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() mensaje?: string; // Recibimos el mensaje
  @Input() tipo?: string; // Recibimos el tipo de mensaje
}