import { Component } from '@angular/core';
import { Jugadores } from 'src/app/models/jugadores';
import { EstadisticasJugadores } from 'src/app/models/estadisticasJugadores';
import { JugadorService } from '../../../services/jugador.service';
import { Observable } from 'rxjs';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  jugadores!: Jugadores[];
  estadisticasJugadores!:EstadisticasJugadores;
  tipo: any;
  jugador: Jugadores | undefined;
  detalle: boolean = false;
  p: number = 1;
  doughnutChartLabels: string[] = [];
  doughnutChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [  ];
  percentageChartLabels: string[] = [];
  percentageChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [  ];
  isFirstChartVisible: boolean = true; 
  partidasGanadas:number []=[];
  partidasPerdidas:number []=[];
  porcentajeVictorias:number []=[];
  nombresJugadores: string [] = [];
  nombresJugadoresPorcentajes: string [] = [];
  constructor(private jugadorService: JugadorService) {}
  public doughnutChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };
  ngOnInit() {
    this.getEstadisticasJugadores().subscribe(
      (estadisticas) => {
        this.estadisticasJugadores = estadisticas;
        console.log('Estadisticas' + JSON.stringify(this.estadisticasJugadores));
        this.partidasGanadas=this.estadisticasJugadores.partidasGanadas;
        this.partidasPerdidas=this.estadisticasJugadores.partidasPerdidas;
        this.porcentajeVictorias=this.estadisticasJugadores.porcentajeVictorias;
        this.nombresJugadores=this.estadisticasJugadores.names;
        this.nombresJugadoresPorcentajes=this.estadisticasJugadores.namesPorcentajes;
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
            { data:this.partidasGanadas.splice(0,3), label: 'Partidas ganadas' },
            // { data: [ 50, 150, 120 ], label: 'Series B' },
            // { data: [ 250, 130, 70 ], label: 'Series C' }
          ];
        this.percentageChartLabels =  this.nombresJugadores.splice(0,3) ;
        this.percentageChartDatasets= [
            { data:this.partidasGanadas.splice(0,3), label: 'Porcentaje Victorias' },
            // { data: [ 50, 150, 120 ], label: 'Series B' },
            // { data: [ 250, 130, 70 ], label: 'Series C' }
          ];
      },
      (error) => {
        console.log('error en recuperar jugadores');
      }
    );

    this.getJugadores().subscribe(
      (jugadores) => {
        this.jugadores = jugadores;
        console.log('Jugadores' + JSON.stringify(this.jugadores));
        const jugadoresOrdenados = jugadores.sort((a, b) => b.partidasGanadas - a.partidasGanadas);

        // Crear arrays separados para partidas ganadas y nombres de jugadores
        this.partidasGanadas = jugadoresOrdenados.map(jugador => jugador.partidasGanadas);
        this.nombresJugadores = jugadoresOrdenados.map(jugador => jugador.name);

        // Imprimir los arrays
        console.log("Array de partidas ganadas ordenadas descendentemente:");
        console.log(this.partidasGanadas);
        console.log("Array de nombres de jugadores en la misma posición:");
        console.log(this.nombresJugadores);
           
        this.doughnutChartLabels =  this.nombresJugadores.splice(0,3) ;
        this.doughnutChartDatasets= [
            { data:this.partidasGanadas.splice(0,3), label: 'Partidas ganadas' },
            // { data: [ 50, 150, 120 ], label: 'Series B' },
            // { data: [ 250, 130, 70 ], label: 'Series C' }
          ];
        this.percentageChartLabels =  this.nombresJugadores.splice(0,3) ;
        this.percentageChartDatasets= [
            { data:this.partidasGanadas.splice(0,3), label: 'Porcentaje Victorias' },
            // { data: [ 50, 150, 120 ], label: 'Series B' },
            // { data: [ 250, 130, 70 ], label: 'Series C' }
          ];
      },
      (error) => {
        console.log('error en recuperar jugadores');
      }
    );
  }
  

  toggleCharts() {
    this.isFirstChartVisible = !this.isFirstChartVisible;
  }
  getJugadores(): Observable<Jugadores[]> {
    return this.jugadorService.getJugadores();
  }
  getEstadisticasJugadores(): Observable<EstadisticasJugadores> {
    return this.jugadorService.getEstadisticasJugadores();
  }

  goDetail(id: number, action: string) {
    this.jugador = this.jugadores.find((jugador) => jugador.id === id);
    this.tipo = action;
    this.detalle = true;
  }
  goBorrar(id: number) {
    // this.
  }
  cerrarHijo() {
    this.detalle = false;
    window.scrollTo(0, 0);
  }
}
