import { ChangeDetectorRef, Component } from '@angular/core';
import { Pareja } from 'src/app/models/pareja';
import { ModalService } from 'src/app/services/modal.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasParejasJugador } from 'src/app/models/estadisticasParejasJugador';

/**
 * Componente para gestionar las parejas.
 * @class
 */
@Component({
  selector: 'app-parejas',
  templateUrl: './parejas.component.html',
  styleUrls: ['./parejas.component.scss'],
})
export class ParejasComponent {
  /**
   * Lista de parejas.
   * @type {Pareja[]}
   */
  parejas: Pareja[] = [];

  /**
   * Identificador de la pareja.
   * @type {any}
   */
  identificador: any;

  /**
   * Tipo de acción.
   * @type {any}
   */
  tipo: any;

  /**
   * Detalle de la pareja.
   * @type {Pareja | undefined}
   */
  parejaDetalle?: Pareja;

  /**
   * Estadísticas de las parejas.
   * @type {EstadisticasParejasJugador}
   */
  estadisticasParejas!: EstadisticasParejasJugador;

  /**
   * Indicador para mostrar u ocultar el detalle.
   * @type {boolean}
   */
  detalle: boolean = false;

  /**
   * Número de página para la paginación.
   * @type {number}
   */
  p: number = 1;

  /**
   * Etiquetas para el gráfico de dona.
   * @type {string[]}
   */
  doughnutChartLabels: string[] = [];

  /**
   * Datos para el gráfico de dona.
   * @type {ChartConfiguration<'bar'>['data']['datasets']}
   */
  doughnutChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [];

  /**
   * Etiquetas para el gráfico de porcentaje.
   * @type {string[]}
   */
  percentageChartLabels: string[] = [];

  /**
   * Datos para el gráfico de porcentaje.
   * @type {ChartConfiguration<'bar'>['data']['datasets']}
   */
  percentageChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [];

  /**
   * Indicador para mostrar u ocultar el primer gráfico.
   * @type {boolean}
   */
  isFirstChartVisible: boolean = true;

  /**
   * Número de partidas ganadas.
   * @type {number[]}
   */
  partidasGanadas: number[] = [];

  /**
   * Número de partidas perdidas.
   * @type {number[]}
   */
  partidasPerdidas: number[] = [];

  /**
   * Porcentaje de victorias.
   * @type {number[]}
   */
  porcentajeVictorias: number[] = [];

  /**
   * Nombres de las parejas.
   * @type {string[]}
   */
  nombresParejas: string[] = [];

  /**
   * Nombres de las parejas para los porcentajes.
   * @type {string[]}
   */
  nombresParejasPorcentajes: string[] = [];

  /**
   * Opciones del gráfico de rosquilla.
   * @type {ChartConfiguration<'bar'>['options']}
   */
  public doughnutChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  /**
   * Opciones del gráfico de porcentaje.
   * @type {ChartConfiguration<'bar'>['options']}
   */
  public percentageChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        suggestedMax: 100
      },
    }
  };


  /**
   * Constructor del componente ParejasComponent.
   * @constructor
   * @param {ParejaService} parejaService - Servicio de parejas.
   * @param {ChangeDetectorRef} cd - Detector de cambios de Angular.
   * @param {ModalService} modalService - Servicio de modales.
   */
  constructor(
    private parejaService: ParejaService,
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.getEstadisticasParejas().subscribe(
      (estadisticas) => {
        this.estadisticasParejas = estadisticas;
        this.partidasGanadas = this.estadisticasParejas.partidasGanadas;
        this.partidasPerdidas = this.estadisticasParejas.partidasPerdidas;
        this.porcentajeVictorias = this.estadisticasParejas.porcentajeVictorias;
        this.nombresParejas = this.estadisticasParejas.names;
        this.nombresParejasPorcentajes = this.estadisticasParejas.namesPorcentaje;
        this.doughnutChartLabels = this.nombresParejas.splice(0, 3);
        this.doughnutChartDatasets = [
          { data: this.partidasGanadas.splice(0, 3), label: 'Partidas Ganadas' },
          { data: this.partidasPerdidas.splice(0, 3), label: 'Partidas Perdidas' }
        ];
        this.percentageChartLabels = this.nombresParejasPorcentajes.splice(0, 3);
        this.percentageChartDatasets = [
          { data: this.porcentajeVictorias.splice(0, 3), label: 'Porcentaje Victorias' }
        ];
      },
      (error) => {
        console.log('Error al recuperar las estadísticas de las parejas');
      }
    );
    this.getParejas();
  }

  /**
   * Método para obtener las parejas.
   * @method
   * @returns {void}
   */
  getParejas() {
    this.parejaService.getParejas().subscribe(
      (parejas) => {
        this.parejas = parejas;
      },
      (error) => {
        this.modalService.openModalError('Error recuperando parejas' + error.error.message);
      }
    );
  }

  /**
   * Método para ir al detalle de una pareja.
   * @method
   * @param {number} id - Identificador de la pareja.
   * @param {string} action - Acción a realizar.
   * @returns {void}
   */
  goDetail(id: number, action: string) {
    this.detalle = false;
    this.identificador = id;
    this.parejaDetalle = this.parejas?.find((pareja) => id === pareja.id);
    this.tipo = action;
    this.detalle = true;
  }

  /**
   * Método para crear un nuevo partido.
   * @method
   * @returns {void}
   */
  createMatch() {
    this.goDetail(0, 'A');
  }

  /**
   * Método para eliminar una pareja.
   * @method
   * @param {number} id - Identificador de la pareja a eliminar.
   * @returns {void}
   */
  eliminarPareja(id: number) {
    this.parejaService.deletePareja(id).subscribe((resultado: Boolean) => {
      if (resultado) {
        this.modalService.openModalInfo(
          'Registro eliminado-Se ha eliminado el registro:' + id
        );
      } else {
        console.log('Error al eliminar el registro');
      }
    });
  }

  /**
   * Método para obtener las estadísticas de las parejas.
   * @method
   * @returns {Observable<EstadisticasParejasJugador>} - Observación de las estadísticas de las parejas.
   */
  getEstadisticasParejas() {
    return this.parejaService.getEstadisticasParejas();
  }

  /**
   * Método para alternar la visualización de los gráficos.
   * @method
   * @returns {void}
   */
  toggleCharts() {
    this.isFirstChartVisible = !this.isFirstChartVisible;
  }
}
