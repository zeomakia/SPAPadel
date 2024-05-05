import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/app/models/ubicacion';
import { ModalService } from 'src/app/services/modal.service';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';

/**
 * Componente para mostrar los detalles de una ubicación y permitir su modificación.
 * @class
 */
@Component({
  selector: 'app-ubicaciones-detail',
  templateUrl: './ubicaciones-detail.component.html',
  styleUrl: './ubicaciones-detail.component.scss' // Aquí debería ser styleUrls
})
export class UbicacionesDetailComponent {
  /**
   * Tipo de acción a realizar ('A' para agregar, 'M' para modificar, 'D' para detalle).
   * @type {string | undefined}
   */
  @Input() tipo?: string;

  /**
   * Ubicación a mostrar o modificar.
   * @type {Ubicacion | undefined}
   */
  @Input() ubicacion?: Ubicacion;

  /**
   * Evento emitido al cerrar el detalle de la ubicación.
   * @type {EventEmitter<void>}
   */
  @Output() cerrarDetalle = new EventEmitter<void>();

  /**
   * Evento emitido al actualizar la información de la ubicación.
   * @type {EventEmitter<void>}
   */
  @Output() actualizar = new EventEmitter<void>();

  /**
   * Referencia al elemento del mapa.
   * @type {ElementRef}
   */
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;

  /**
   * Formulario para la ubicación.
   * @type {FormGroup}
   */
  ubicacionForm: FormGroup;

  /**
   * Constructor del componente de detalle de ubicaciones.
   * @constructor
   * @param {NgZone} ngZone - Zona de Angular.
   * @param {UbicacionService} ubicacionService - Servicio de ubicaciones.
   * @param {ModalService} modalService - Servicio de modales.
   * @param {ChangeDetectorRef} cd - Referencia para el cambio de detección.
   */
  constructor(
    private ngZone: NgZone,
    private ubicacionService: UbicacionService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.ubicacionForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', Validators.required),
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.actualizarMapa();
    this.actualizarForm();
  }

  /**
   * Método que se ejecuta al detectar cambios en las entradas del componente.
   * @method
   * @returns {void}
   */
  ngOnChanges() {
    this.actualizarMapa();
    this.actualizarForm();
  }

  /**
   * Método para actualizar el mapa.
   * @method
   * @returns {void}
   */
  actualizarMapa() {
    if (this.tipo !== 'A') {
      const ubicacionMaps = this.ubicacion?.direccion + ', ' + this.ubicacion?.codigo_postal;
      this.geocodeAddress(ubicacionMaps);
    }
  }

  /**
   * Método para geocodificar una dirección y cargar el mapa.
   * @method
   * @param {string} address - Dirección a geocodificar.
   * @returns {void}
   */
  geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        this.loadMap(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /**
   * Método para cargar el mapa.
   * @method
   * @param {any} location - Ubicación para centrar el mapa.
   * @returns {void}
   */
  loadMap(location: any) {
    const mapProperties = {
      center: location,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  /**
   * Método para regresar al componente anterior.
   * @method
   * @returns {void}
   */
  goBack(): void {
    if (this.tipo === 'M')
      this.modalService.openModalInfo('Ubicación modificada correctamente');
    else
      this.modalService.openModalInfo('Ubicación creada correctamente');

    this.actualizar.emit();
    this.cerrarDetalle.emit();
  }

  /**
   * Método para guardar la ubicación.
   * @method
   * @returns {void}
   */
  guardarubicacion() {
    if (this.ubicacionForm.valid) {
      const ubicacion: Ubicacion = {
        id: this.tipo === 'M' ? this.ubicacionForm.get('id')?.value : 0,
        name: this.ubicacionForm.get('name')?.value,
        direccion: this.ubicacionForm.get('direccion')?.value,
        codigo_postal: this.ubicacionForm.get('codigo_postal')?.value,
      };
      if (this.tipo === 'M') {
        this.ubicacionService.modifyUbicacion(ubicacion).subscribe(
          (response) => {
            this.goBack();
          },
          (error) => {
            console.error('Error al modificar la partida: ', JSON.stringify(error));
            this.modalService.openModalError('Error al modificar la partida: ');
          }
        );
      } else {
        this.ubicacionService.addUbicacion(ubicacion).subscribe(
          (response) => {
            this.goBack();
          },
          (error) => {
            console.error('Error al crear la partida: ', JSON.stringify(error));
            this.modalService.openModalError('Error al crear la ubicacio: ' + error.error.message);
          }
        );
      }
    }
  }

  /**
   * Método para actualizar el formulario.
   * @method
   * @returns {void}
   */
  actualizarForm(): void {
    if (this.tipo !== 'A') {
      this.ubicacionForm.setValue({
        id: this.ubicacion?.id,
        name: this.ubicacion?.name,
        direccion: this.ubicacion?.direccion,
        codigo_postal: this.ubicacion?.codigo_postal
      });
      if (this.tipo === 'D')
        this.deshabilitarForm();
      else
        this.habilitarForm();
    } else {
      this.ubicacionForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        direccion: new FormControl('', Validators.required),
        codigo_postal: new FormControl('', Validators.required),
      });
    }
  }

  /**
   * Método para habilitar el formulario.
   * @method
   * @returns {void}
   */
  habilitarForm() {
    this.ubicacionForm.get('name')?.enable();
    this.ubicacionForm.get('direccion')?.enable();
    this.ubicacionForm.get('codigo_postal')?.enable();
  }

  /**
   * Método para deshabilitar el formulario.
   * @method
   * @returns {void}
   */
  deshabilitarForm() {
    this.ubicacionForm.get('name')?.disable();
    this.ubicacionForm.get('direccion')?.disable();
    this.ubicacionForm.get('codigo_postal')?.disable();
  }
}
