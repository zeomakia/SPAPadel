import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';

import { Partida } from '../../../models/partida';
import { PartidaService } from '../../../services/partida.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Pareja } from '../../../models/pareja';
import { ParejaService } from '../../../services/pareja.service';
import { UbicacionService } from '../../../services/ubicacion-service.service';
import { Ubicacion } from '../../../models/ubicacion';
import { BrowserModule } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';
/**
 * Componente Angular para mostrar y gestionar detalles de una partida.
 * @class
 */
@Component({
  selector: 'app-partida-detail',
  templateUrl: './partida-detail.component.html',
  styleUrls: ['./partida-detail.component.scss'],
})
export class PartidaDetailComponent implements OnInit {
  /**
   * Formulario para crear una nueva partida.
   * @type {FormGroup}
   */
  nuevaPartidaForm: FormGroup;

  /**
   * Evento emitido cuando se crea una nueva partida.
   * @type {EventEmitter<void>}
   */
  @Output() partidaCreada = new EventEmitter<void>();

  /**
   * Evento emitido cuando se cierra el detalle de la partida.
   * @type {EventEmitter<void>}
   */
  @Output() cerrarDetalle = new EventEmitter<void>();

  /**
   * Identificador de la partida.
   * @type {number}
   */
  @Input() identificador!: number;

  /**
   * Tipo de la partida.
   * @type {string | undefined}
   */
  @Input() tipo?: string;

  /**
   * Objeto que representa una partida.
   * @type {Partida}
   */
  partida!: Partida;

  /**
   * Lista de parejas.
   * @type {Pareja[]}
   */
  parejas: Pareja[] = [];

  /**
   * Lista de ubicaciones.
   * @type {Ubicacion[]}
   */
  ubicaciones: Ubicacion[] = [];

  /**
   * Indicador para deshabilitar elementos.
   * @type {boolean}
   */
  disable: boolean = true;

  /**
   * Constructor del componente.
   * @constructor
   * @param {ActivatedRoute} route - Servicio para acceder a los parámetros de la ruta.
   * @param {PartidaService} partidaService - Servicio para gestionar partidas.
   * @param {UbicacionService} ubicacionService - Servicio para gestionar ubicaciones.
   * @param {ParejaService} parejaService - Servicio para gestionar parejas.
   * @param {Location} location - Ubicación del navegador.
   * @param {ModalService} modalService - Servicio para mostrar modales.
   */
  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private ubicacionService: UbicacionService,
    private parejaService: ParejaService,
    private location: Location,
    private modalService: ModalService
  ) {
    // Inicialización del formulario de nueva partida
    this.nuevaPartidaForm = new FormGroup({
      pareja1Form: new FormControl('', Validators.required),
      pareja2Form: new FormControl('', Validators.required),
      ubicacionForm: new FormControl('', Validators.required),
      parejaGanadoraForm: new FormControl('', Validators.required),
      resultadoForm: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^((6-[0-4])|(7-[5-6])|([5-7]-7)|([0-4]-6)) ((6-[0-4])|(7-[5-6])|([5-7]-7)|([0-4]-6)) ((6-[0-4])|(7-[5-6])|([5-7]-7)|([0-4]-6))'
        ),
      ]),
      diaForm: new FormControl('', Validators.required),
    });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit(): void {
    if (this.identificador == 0) {
      this.getParejas().subscribe(
        (parejas) => {
          this.parejas = parejas;
          this.getUbicaciones().subscribe((ubicaciones) => {
            this.ubicaciones = ubicaciones;
            this.rellenarFormulario(
              this.partida,
              this.parejas,
              this.ubicaciones
            );
          });
        },
        (error) => {
          this.modalService.openModalError(
            'Error recuperando los datos de parejas' + error.error.message
          );
        }
      );
    } else {
      this.getPartida().subscribe(
        (partida) => {
          this.partida = partida;
          this.disable = this.tipo === 'D';
          if (this.tipo === 'M') {
            this.getParejas().subscribe((parejas) => {
              this.parejas = parejas;
              this.getUbicaciones().subscribe((ubicaciones) => {
                this.ubicaciones = ubicaciones;
                this.rellenarFormulario(
                  this.partida,
                  this.parejas,
                  this.ubicaciones
                );
              });
            });
          }
        },
        (error) => {
          this.modalService.openModalError(
            'Error recuperando partidas' + error.error.message
          );
        }
      );
    }
  }

  /**
   * Método que se ejecuta al detectar cambios en las propiedades de entrada.
   * @method
   * @param {SimpleChanges} changes - Cambios detectados.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.identificador == 0) {
      this.getParejas();
      this.getUbicaciones();
    } else {
      this.getPartida().subscribe(
        (partida) => {
          this.partida = partida;
          this.disable = this.tipo === 'D';
          if (this.tipo === 'M') {
            this.getParejas().subscribe((parejas) => {
              this.parejas = parejas;
              this.getUbicaciones().subscribe((ubicaciones) => {
                this.ubicaciones = ubicaciones;
                this.rellenarFormulario(
                  this.partida,
                  this.parejas,
                  this.ubicaciones
                );
              });
            });
          }
        },
        (error) => {
          this.modalService.openModalError(
            'Error recuperando partidas' + error.error.message
          );
        }
      );
    }
  }

  /**
   * Método para rellenar el formulario con los datos de la partida.
   * @method
   * @param {Partida} partida - Datos de la partida.
   * @param {Pareja[]} parejas - Lista de parejas.
   * @param {Ubicacion[]} ubicaciones - Lista de ubicaciones.
   * @returns {void}
   */
  rellenarFormulario(
    partida: Partida,
    parejas: Pareja[],
    ubicaciones: Ubicacion[]
  ) {
    const pareja1 = parejas.find(
      (pareja) => pareja.nombrePareja === partida.pareja1
    );
    const pareja2 = parejas.find(
      (pareja) => pareja.nombrePareja === partida.pareja2
    );
    const ubicacion = ubicaciones.find(
      (ubicacion) => ubicacion.name.trim() === partida.ubicacion.trim()
    );
    const parejaGanadora = parejas.find(
      (pareja) => pareja.nombrePareja === partida.parejaGanadora
    );

    this.nuevaPartidaForm.setValue({
      pareja1Form: pareja1 ? pareja1.id : null,
      pareja2Form: pareja2 ? pareja2.id : null,
      ubicacionForm: ubicacion ? ubicacion.id : null,
      resultadoForm: partida.resultado,
      parejaGanadoraForm: parejaGanadora ? parejaGanadora.id : null,
      diaForm: partida.dia,
    });
  }

  /**
   * Método para obtener los detalles de una partida.
   * @method
   * @returns {Observable<Partida>} - Observable que emite los detalles de la partida.
   */
  getPartida(): Observable<Partida> {
    return this.partidaService.getPartida(this.identificador);
  }

  /**
   * Método para obtener la lista de parejas.
   * @method
   * @returns {Observable<Pareja[]>} - Observable que emite la lista de parejas.
   */
  getParejas(): Observable<Pareja[]> {
    return this.parejaService.getParejas();
  }

  /**
   * Método para obtener la lista de ubicaciones.
   * @method
   * @returns {Observable<Ubicacion[]>} - Observable que emite la lista de ubicaciones.
   */
  getUbicaciones(): Observable<Ubicacion[]> {
    return this.ubicacionService.getUbicaciones();
  }

  /**
   * Método para retroceder.
   * @method
   * @returns {void}
   */
  goBack(): void {
    // this.location.back();
    this.modalService.openModalInfo('Partida actualizada');
    this.cerrarDetalle.emit();
  }

  /**
   * Método para guardar una nueva partida.
   * @method
   * @returns {void}
   */
  guardarNuevaPartida() {
    if (this.nuevaPartidaForm.valid) {
      // Crear una nueva instancia de Partida
      const nuevaPartida: Partida = {
        id: this.tipo === 'M' ? this.identificador : 0,
        dia: this.nuevaPartidaForm.get('diaForm')?.value,
        pareja1: this.nuevaPartidaForm.get('pareja1Form')?.value,
        pareja2: this.nuevaPartidaForm.get('pareja2Form')?.value,
        parejaGanadora: this.nuevaPartidaForm.get('parejaGanadoraForm')?.value,
        parejaPerdedora:
          this.nuevaPartidaForm.get('parejaGanadoraForm')?.value ===
          this.nuevaPartidaForm.get('pareja1Form')?.value
            ? this.nuevaPartidaForm.get('pareja2Form')?.value
            : this.nuevaPartidaForm.get('pareja1Form')?.value,
        ubicacion: this.nuevaPartidaForm.get('ubicacionForm')?.value,
        resultado: this.nuevaPartidaForm.get('resultadoForm')?.value,
      };

      // Llamar al servicio con la nueva partida
      if (this.tipo === 'M') {
        this.partidaService.updatePartida(nuevaPartida).subscribe(
          () => {
            this.partidaCreada.emit();
            this.goBack();
          },
          (error) => {
            console.error(
              'Error al modificar la partida: ',
              error.error.message
            );
            this.modalService.openModalError(
              'Error al crear la partida: ' + error.error.message
            );
          }
        );
      } else {
        this.partidaService.addPartida(nuevaPartida).subscribe(
          () => {
            this.partidaCreada.emit();
            this.goBack();
          },
          (error) => {
            console.error('Error al crear la partida: ', error.error.message);
            this.modalService.openModalError(
              'Error al crear la partida: ' + error.error.message
            );
          }
        );
      }
    }
  }
}
