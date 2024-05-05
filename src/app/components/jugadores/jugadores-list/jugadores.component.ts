import { Component } from '@angular/core';
import { Jugadores } from 'src/app/models/jugadores';
import { EstadisticasJugadores } from 'src/app/models/estadisticasJugadores';
import { JugadorService } from '../../../services/jugador.service';
import { Observable } from 'rxjs';
import { ChartConfiguration } from 'chart.js';

/**
 * Componente para la visualización de jugadores y sus estadísticas.
 * @class
 */
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  /**
   * Lista de jugadores.
   * @type {Jugadores[]}
   */
  jugadores!: Jugadores[];

  /**
   * Estadísticas de los jugadores.
   * @type {EstadisticasJugadores}
   */
  estadisticasJugadores!: EstadisticasJugadores;

  /**
   * Tipo de acción.
   * @type {any}
   */
  tipo: any;

  /**
   * Jugador seleccionado.
   * @type {Jugadores | undefined}
   */
  jugador: Jugadores | undefined;

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
   * Etiquetas para el gráfico de rosquilla.
   * @type {string[]}
   */
  doughnutChartLabels: string[] = [];

  /**
   * Conjunto de datos para el gráfico de rosquilla.
   * @type {ChartConfiguration<'bar'>['data']['datasets']}
   */
  doughnutChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [];

  /**
   * Etiquetas para el gráfico de porcentaje.
   * @type {string[]}
   */
  percentageChartLabels: string[] = [];

  /**
   * Conjunto de datos para el gráfico de porcentaje.
   * @type {ChartConfiguration<'bar'>['data']['datasets']}
   */
  percentageChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [];

  /**
   * Indicador de visualización del primer gráfico.
   * @type {boolean}
   */
  isFirstChartVisible: boolean = true;

  partidasGanadas:number []=[];
  partidasPerdidas:number []=[];
  porcentajeVictorias:number []=[];
  nombresJugadores: string [] = [];
  nombresJugadoresPorcentajes: string [] = [];

  /**
   * Opciones para el gráfico de rosquilla.
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
   * Opciones para el gráfico de porcentaje.
   * @type {ChartConfiguration<'bar'>['options']}
   */
  public percentageChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        suggestedMax: 100
      }
    }
  };

  /**
   * Constructor del componente JugadoresComponent.
   * @constructor
   * @param {JugadorService} jugadorService - Servicio de jugadores.
   */
  constructor(private jugadorService: JugadorService) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.getEstadisticasJugadores().subscribe(
      (estadisticas) => {
        this.estadisticasJugadores = estadisticas;
        console.log('Estadisticas' + JSON.stringify(this.estadisticasJugadores));
        this.partidasGanadas=this.estadisticasJugadores.partidasGanadas;
        this.partidasPerdidas=this.estadisticasJugadores.partidasPerdidas;
        this.porcentajeVictorias=this.estadisticasJugadores.porcentajeVictorias;
        this.nombresJugadores=this.estadisticasJugadores.names;
        this.nombresJugadoresPorcentajes=this.estadisticasJugadores.namesPorcentaje;
        // Imprimir los arrays
        console.log("Array de partidas ganadas ordenadas descendentemente:");
        console.log(this.partidasGanadas);
        console.log("Array de partidas perdidas ordenadas descendentemente por partidaas ganadas:");
        console.log(this.partidasPerdidas);
        console.log("Array de nombres de jugadores en la misma posición:");
        console.log(this.nombresJugadores);
        console.log("Array de porcentajes de victorias ordenadas descendentemente:");
        console.log(this.porcentajeVictorias);
        console.log("Array de nombres de jugadores en la misma posición:");
        console.log(this.nombresJugadoresPorcentajes);   
        this.doughnutChartLabels =  this.nombresJugadores.splice(0,3) ;
        this.doughnutChartDatasets= [
            { data:this.partidasGanadas.splice(0,3), label: 'Partidas Ganadas' },
            { data:this.partidasPerdidas.splice(0,3), label: 'Partidas Perdidas' }
          ];
        this.percentageChartLabels =  this.nombresJugadoresPorcentajes.splice(0,3) ;
        this.percentageChartDatasets= [
            { data:this.porcentajeVictorias.splice(0,3), label: 'Porcentaje Victorias' }
          ];
      },
      (error) => {
        console.log('error en recuperar estadisticas jugadores');
      }
    );

    this.getJugadores().subscribe(
      (jugadores) => {
        this.jugadores = jugadores;
      },
      (error) => {
        console.log('error en recuperar jugadores');
      }
    );
  }

  /**
   * Método para alternar la visualización de los gráficos.
   * @method
   * @returns {void}
   */
  toggleCharts() {
    this.isFirstChartVisible = !this.isFirstChartVisible;
  }

  /**
   * Método para obtener la lista de jugadores.
   * @method
   * @returns {Observable<Jugadores[]>} - Observable de la lista de jugadores.
   */
  getJugadores(): Observable<Jugadores[]> {
    return this.jugadorService.getJugadores();
  }

  /**
   * Método para obtener las estadísticas de los jugadores.
   * @method
   * @returns {Observable<EstadisticasJugadores>} - Observable de las estadísticas de los jugadores.
   */
  getEstadisticasJugadores(): Observable<EstadisticasJugadores> {
    return this.jugadorService.getEstadisticasJugadores();
  }

  /**
   * Método para visualizar el detalle de un jugador.
   * @method
   * @param {number} id - ID del jugador.
   * @param {string} action - Acción a realizar.
   * @returns {void}
   */
  goDetail(id: number, action: string) {
    this.jugador = this.jugadores.find((jugador) => jugador.id === id);
    this.tipo = action;
    this.detalle = true;
  }

  /**
   * Método para eliminar un jugador.
   * @method
   * @param {number} id - ID del jugador.
   * @returns {void}
   */
  goBorrar(id: number) {
    // Lógica para eliminar un jugador
  }

  /**
   * Método para cerrar el detalle de un jugador.
   * @method
   * @returns {void}
   */
  cerrarHijo() {
    this.detalle = false;
    window.scrollTo(0, 0);
  }
}
