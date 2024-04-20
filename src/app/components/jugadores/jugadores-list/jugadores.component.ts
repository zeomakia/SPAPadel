import { Component } from '@angular/core';
import { Jugadores } from 'src/app/models/jugadores';
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
  tipo: any;
  jugador: Jugadores | undefined;
  detalle: boolean = false;
  p: number = 1;
  doughnutChartLabels: string[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [  ];

  partidasGanadas:number []=[];
  nombresJugadores: string [] = [];
  constructor(private jugadorService: JugadorService) {}
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  ngOnInit() {
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
      },
      (error) => {
        console.log('error en recuperar jugadores');
      }
    );
  }

  getJugadores(): Observable<Jugadores[]> {
    return this.jugadorService.getJugadores();
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
