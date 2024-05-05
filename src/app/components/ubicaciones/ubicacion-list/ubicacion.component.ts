/// <reference types="@types/googlemaps" />
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { HttpResponse } from '@angular/common/http';

/**
 * Componente para mostrar y gestionar ubicaciones.
 * @class
 */
@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent {
  /**
   * Lista de ubicaciones.
   * @type {Ubicacion[]}
   */
  ubicaciones!: Ubicacion[];

  /**
   * Tipo de acción (crear, detalle, etc.).
   * @type {any}
   */
  tipo: any;

  /**
   * Ubicación seleccionada.
   * @type {Ubicacion | undefined}
   */
  ubicacion: Ubicacion | undefined;

  /**
   * Indicador de visualización del detalle.
   * @type {boolean}
   */
  detalle: boolean = false;

  /**
   * Página actual del paginador.
   * @type {number}
   */
  p: number = 1;

  /**
   * Constructor del componente UbicacionComponent.
   * @constructor
   * @param {UbicacionService} ubicacionService - Servicio de ubicaciones.
   * @param {ModalService} modalService - Servicio de modales.
   * @param {ChangeDetectorRef} cd - Referencia para el cambio de detección.
   */
  constructor(
    private ubicacionService: UbicacionService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.getUbicaciones()
      .subscribe(
        (ubicaciones) => { this.ubicaciones = ubicaciones },
        (error) => { this.modalService.openModalError("Error recuperando ubicaciones" + error) }
      );
  }

  /**
   * Método para obtener las ubicaciones.
   * @method
   * @returns {Observable<Ubicacion[]>} - Observable de la lista de ubicaciones.
   */
  getUbicaciones(): Observable<Ubicacion[]> {
    return this.ubicacionService.getUbicaciones();
  }

  /**
   * Método para ir al detalle de una ubicación.
   * @method
   * @param {number} id - ID de la ubicación.
   * @param {string} action - Acción a realizar.
   * @returns {void}
   */
  goDetail(id: number, action: string) {
    this.ubicacion = this.ubicaciones.find(ubicacion => ubicacion.id === id);
    this.tipo = action;
    this.detalle = true;
  }

  /**
   * Método para borrar una ubicación.
   * @method
   * @param {number} id - ID de la ubicación.
   * @returns {void}
   */
  goBorrar(id: number) {
    this.ubicacionService.deleteUbicacion(id).subscribe(
      (response: HttpResponse<any>) => {
        console.log(response);
        const mensaje = response.body && response.body.message ? response.body.message : "Ubicacion borrada correctamente.";
        this.modalService.openModalInfo(mensaje)
        this.actualizarLista()
      },
      (err) => { this.modalService.openModalError("Ha habido un error borrando la ubicación."); }
    );
  }

  /**
   * Método para crear una nueva ubicación.
   * @method
   * @returns {void}
   */
  createUbicacion() {
    this.detalle = false;
    this.tipo = 'A';
    this.detalle = true;
  }

  /**
   * Método para cerrar el detalle de una ubicación.
   * @method
   * @returns {void}
   */
  cerrarHijo() {
    this.detalle = false;
  }

  /**
   * Método para actualizar la lista de ubicaciones.
   * @method
   * @returns {void}
   */
  actualizarLista() {
    this.getUbicaciones()
      .subscribe(
        (ubicaciones) => { this.ubicaciones = ubicaciones },
        (error) => { this.modalService.openModalError("Error recuperando ubicaciones" + error) }
      );
  }
}
