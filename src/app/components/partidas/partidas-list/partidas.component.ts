import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Partida } from '../../../models/partida';
import { PartidaService } from '../../../services/partida.service';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';

/**
 * Componente Angular para mostrar y gestionar partidas.
 * @class
 */
@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss'],
})
export class PartidasComponent {
  /**
   * Número de página para la paginación.
   * @type {number}
   */
  p: number = 1;

  /**
   * Lista de partidas.
   * @type {Partida[]}
   */
  partidas: Partida[] = [];

  /**
   * Identificador de la partida.
   * @type {any}
   */
  identificador: any;

  /**
   * Tipo de la partida.
   * @type {any}
   */
  tipo: any;

  /**
   * Indicador para mostrar o ocultar detalles.
   * @type {boolean}
   */
  detalle: boolean = false;

  /**
   * Referencia al elemento hijo.
   * @type {ElementRef | undefined}
   */
  @ViewChild('hijoRef', { read: ElementRef }) hijo!: ElementRef;

  /**
   * Constructor del componente.
   * @constructor
   * @param {PartidaService} partidaService - Servicio para gestionar partidas.
   * @param {ModalService} modalService - Servicio para mostrar modales.
   * @param {ChangeDetectorRef} cd - Detector de cambios.
   */
  constructor(
    private partidaService: PartidaService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.getPartidas().subscribe(
      (partidas) => {
        this.partidas = partidas;
        console.log('Partidos:', this.partidas); // Mueve el console.log aquí
      },
      (error) => {
        this.modalService.openModalError(
          'Ha habido un error recuperando las partidas' + error.error.message
        );
      }
    );
  }

  /**
   * Método para recoger las partidas mediante la invocación del servicio "PartidaService".
   * @method
   * @returns {Observable<Partida[]>} - Observable que emite la lista de partidas.
   */
  getPartidas(): Observable<Partida[]> {
    return this.partidaService.getPartidas();
  }

  /**
   * El método `goDetail` establece propiedades y desplaza la ventana a un elemento específico
   * según el id proporcionado y la acción.
   * @method
   * @param {number} id - El parámetro `id` en la función `goDetail` es un número que representa
   * el identificador de un elemento. Se utiliza para especificar qué elemento mostrar.
   * @param {string} action - El parámetro `action` en la función `goDetail` parece representar el
   * tipo de acción que se está realizando. Es un parámetro de tipo string que probablemente especifica
   * el tipo de detalle u operación a realizar según el `id` proporcionado.
   */
  goDetail(id: number, action: string) {
    this.detalle = false;
    this.identificador = id;
    this.tipo = action;
    this.detalle = true;
    setTimeout(() => {
      if (this.hijo !== undefined)
        this.hijo.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  /**
   * Método para crear un partido.
   * @method
   * @returns {void}
   */
  createMatch() {
    this.goDetail(0, 'A');
  }

  /**
   * La función `cerrarHijo()` cierra un elemento hijo y desplaza la ventana al principio.
   * @method
   * @returns {void}
   */
  cerrarHijo() {
    this.detalle = false;
    window.scrollTo(0, 0);
  }

  /**
   * Método para eliminar una partida.
   * @method
   * @param {number} id - Identificador de la partida a eliminar.
   * @returns {void}
   */
  eliminarPartida(id: number) {
    this.partidaService.deletePartida(id).subscribe(
      (resultado) => {
        console.log('Se ha eliminado el registro:' + id);
        this.modalService.openModalInfo('Registro eliminado correctamente');
        this.getPartidas().subscribe((partidas) => {
          this.partidas = partidas;
          console.log('Partidos:', this.partidas); // Mueve el console.log aquí
          this.p = 1;
        });
      },
      (error) => {
        this.modalService.openModalError(
          'Error al borrar la partida: ' + error.error.message
        );
        console.log('error!!!!!');
      }
    );
  }
}
