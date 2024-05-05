import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jugadores } from 'src/app/models/jugadores';
import { Pareja } from 'src/app/models/pareja';
import { JugadorService } from 'src/app/services/jugador.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { PartidaService } from 'src/app/services/partida.service';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { Location } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';

/**
 * Componente para gestionar los detalles de las parejas.
 * @class
 */
@Component({
  selector: 'app-parejas-detail',
  templateUrl: './parejas-detail.component.html',
  styleUrls: ['./parejas-detail.component.scss'],
})
export class ParejasDetailComponent implements OnInit {
  /**
   * Formulario para la creación de una nueva pareja.
   * @type {FormGroup}
   */
  nuevaParejaForm: FormGroup;

  /**
   * Formulario para la edición de la pareja.
   * @type {FormGroup}
   */
  parejaForm: FormGroup;

  /**
   * Identificador de la pareja.
   * @type {number}
   */
  @Input() identificador!: number;

  /**
   * Tipo de acción.
   * @type {string | undefined}
   */
  @Input() tipo?: string;

  /**
   * Pareja.
   * @type {Pareja | undefined}
   */
  @Input() pareja?: Pareja;

  /**
   * Evento para cerrar el detalle.
   * @type {EventEmitter<void>}
   */
  @Output() cerrarDetalle = new EventEmitter<void>();

  /**
   * Evento para actualizar.
   * @type {EventEmitter<void>}
   */
  @Output() actualizar = new EventEmitter<void>();

  /**
   * Lista de parejas.
   * @type {Pareja[]}
   */
  parejas: Pareja[] = [];

  /**
   * Lista de jugadores.
   * @type {Jugadores[]}
   */
  jugadores: Jugadores[] = [];

  /**
   * Indicador de deshabilitación.
   * @type {boolean}
   */
  disable: boolean = true;

  /**
   * Indicador de si es una nueva pareja.
   * @type {boolean}
   */
  isParejaNueva: boolean = false;

  /**
   * Etiquetas del gráfico de rosquilla.
   * @type {string[]}
   */
  doughnutChartLabels: string[] = [];

  /**
   * Conjunto de datos del gráfico de rosquilla.
   * @type {ChartConfiguration<'doughnut'>['data']['datasets']}
   */
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [];

  /**
   * Porcentaje.
   * @type {number}
   */
  porcentaje: number = 0;

  /**
   * Opciones del gráfico de rosquilla.
   * @type {ChartConfiguration<'doughnut'>['options']}
   */
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  /**
   * Constructor del componente ParejasDetailComponent.
   * @constructor
   * @param {ActivatedRoute} route - Ruta activada.
   * @param {PartidaService} partidaService - Servicio de partidas.
   * @param {UbicacionService} ubicacionService - Servicio de ubicaciones.
   * @param {ParejaService} parejaService - Servicio de parejas.
   * @param {JugadorService} jugadorService - Servicio de jugadores.
   * @param {Location} location - Ubicación.
   * @param {ChangeDetectorRef} cd - Detector de cambios de Angular.
   * @param {ModalService} modalService - Servicio de modales.
   */
  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private ubicacionService: UbicacionService,
    private parejaService: ParejaService,
    private jugadorService: JugadorService,
    private location: Location,
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    this.parejaForm = new FormGroup({
      parejaIdForm: new FormControl('', Validators.required),
      parejaOptionForm: new FormControl('', Validators.required),
      p_ganadasForm: new FormControl('', Validators.required),
      p_jugadasForm: new FormControl('', Validators.required),
      p_perdidasForm: new FormControl('', Validators.required),
    });
    this.nuevaParejaForm = new FormGroup({
      jugador1Form: new FormControl('', Validators.required),
      jugador2Form: new FormControl('', Validators.required),
    });
  }

  /**
   * Opciones del gráfico de rosquilla.
   * @type {ChartConfiguration<'doughnut'>['options']}
   */

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit(): void {
    (window as any)['ParejasDetailComponent'] = this;
    if (this.identificador == 0) {
      this.isParejaNueva = true;
      this.getJugadores();
    } else {
      this.getParejas().subscribe((parejas) => {
        this.parejas = parejas;
        this.rellenarForm();
      });
    }
  }

  /**
   * Método que se ejecuta al cambiar los datos de entrada.
   * @method
   * @param {SimpleChanges} changes - Cambios detectados.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    (window as any)['ParejasDetailComponent'] = this;
    if (this.identificador == 0) {
      this.isParejaNueva = true;
      this.getParejas().subscribe((parejas) => (this.parejas = parejas));
    } else {
      this.isParejaNueva = false;
      this.getParejas().subscribe((parejas) => {
        this.parejas = parejas;
        this.rellenarForm();
      });
    }
  }

  /**
   * Método para rellenar las estadísticas.
   * @method
   * @returns {void}
   */
  rellenarEstadisticas() {
    let ganadas: number = this.pareja?.p_ganadas || 0;
    let perdidas: number = this.pareja?.p_perdidas || 0;
    let jugadas: number = this.pareja?.p_jugadas || 1;
    this.porcentaje = (ganadas / jugadas) * 100;
    this.porcentaje = parseFloat(this.porcentaje.toFixed(0));
    this.doughnutChartLabels = ['Partidas Ganadas', 'Partidas Perdidas'];
    this.doughnutChartDatasets = [{ data: [ganadas, perdidas] }];
  }

  /**
   * Método para obtener los jugadores.
   * @method
   * @returns {void}
   */
  getJugadores(): void {
    this.jugadorService
      .getJugadores()
      .subscribe((jugadores) => (this.jugadores = jugadores));
  }

  /**
   * Método para obtener las parejas.
   * @method
   * @returns {Observable<Pareja[]>} - Observación de las parejas.
   */
  getParejas(): Observable<Pareja[]> {
    return this.parejaService.getParejas();
  }

  /**
   * Método para retroceder.
   * @method
   * @returns {void}
   */
  goBack(): void {
    this.actualizar.emit();
    this.cerrarDetalle.emit();
  }

  /**
   * Método para guardar los cambios.
   * @method
   * @returns {void}
   */
  save(): void {
    this.parejaService.updatePareja(this.pareja!).subscribe(
      () => {
        this.modalService.openModalInfo('Pareja actualizada correctamente');
        this.goBack();
      },
      (error) => {
        console.error('Error al modificar la pareja: ', error.error.message);
        this.modalService.openModalError(
          'Error al modificar la pareja: ' + error.error.message
        );
      }
    );
  }

  /**
   * Método para guardar una nueva pareja.
   * @method
   * @returns {void}
   */
  guardarNuevaPareja() {
    if (this.nuevaParejaForm.valid) {
      const nuevaPareja: Pareja = {
        id: 0,
        jugador1: this.nuevaParejaForm.get('jugador1Form')?.value,
        jugador2: this.nuevaParejaForm.get('jugador2Form')?.value,
      };

      this.parejaService.addPareja(nuevaPareja).subscribe(
        (response) => {
          this.modalService.openModalInfo('Pareja creada correctamente');
          this.goBack();
        },
        (error) => {
          console.error('Error al crear la pareja: ', error.error.message);
          this.modalService.openModalError(
            'Error al crear la pareja: ' + error.error.message
          );
        }
      );
    }
  }

  /**
   * Método para rellenar el formulario.
   * @method
   * @returns {void}
   */
  rellenarForm() {
    if (this.tipo !== 'A') {
      this.parejaForm.setValue({
        parejaIdForm: this.pareja?.id,
        parejaOptionForm: this.pareja!.id,
        p_ganadasForm: this.pareja?.p_ganadas,
        p_jugadasForm: this.pareja?.p_jugadas,
        p_perdidasForm: this.pareja?.p_perdidas,
      });
      if (this.tipo === 'D') {
        this.deshabilitarForm();
        this.rellenarEstadisticas();
      } else this.habilitarForm();
    }
  }

  /**
   * Método para habilitar el formulario.
   * @method
   * @returns {void}
   */
  habilitarForm() {
    this.parejaForm.get('parejaIdForm')?.disable();
    this.parejaForm.get('parejaOptionForm')?.enable();
    this.parejaForm.get('p_ganadasForm')?.enable();
    this.parejaForm.get('p_jugadasForm')?.enable();
    this.parejaForm.get('p_perdidasForm')?.enable();
  }

  /**
   * Método para deshabilitar el formulario.
   * @method
   * @returns {void}
   */
  deshabilitarForm() {
    this.parejaForm.get('parejaIdForm')?.disable();
    this.parejaForm.get('parejaOptionForm')?.disable();
    this.parejaForm.get('p_ganadasForm')?.disable();
    this.parejaForm.get('p_jugadasForm')?.disable();
    this.parejaForm.get('p_perdidasForm')?.disable();
  }
}
