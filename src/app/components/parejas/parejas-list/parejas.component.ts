import { ChangeDetectorRef, Component } from '@angular/core';
import { Pareja } from 'src/app/models/pareja';
import { ModalService } from 'src/app/services/modal.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { ChartConfiguration } from 'chart.js';
import { EstadisticasParejasJugador } from 'src/app/models/estadisticasParejasJugador';

@Component({
  selector: 'app-parejas',
  templateUrl: './parejas.component.html',
  styleUrls: ['./parejas.component.scss'],
})
export class ParejasComponent {
  parejas: Pareja[] = [];
  identificador: any;
  tipo: any;
  parejaDetalle?: Pareja;
  estadisticasParejas!:EstadisticasParejasJugador;
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
  nombresParejas: string [] = [];
  nombresParejasPorcentajes: string [] = [];
  public doughnutChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };
  public percentageChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
        y: {
            suggestedMax: 100
        },
      }  
  };
  constructor(
    private parejaService: ParejaService,
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getEstadisticasParejas().subscribe(
      (estadisticas) => {
        this.estadisticasParejas = estadisticas;
        // console.log('Estadisticas' + JSON.stringify(this.estadisticasParejas));
        this.partidasGanadas=this.estadisticasParejas.partidasGanadas;
        this.partidasPerdidas=this.estadisticasParejas.partidasPerdidas;
        this.porcentajeVictorias=this.estadisticasParejas.porcentajeVictorias;
        this.nombresParejas=this.estadisticasParejas.names;
        this.nombresParejasPorcentajes=this.estadisticasParejas.namesPorcentaje;
        this.doughnutChartLabels =  this.nombresParejas.splice(0,3) ;
        this.doughnutChartDatasets= [
            { data:this.partidasGanadas.splice(0,3), label: 'Partidas Ganadas' },
            { data:this.partidasPerdidas.splice(0,3), label: 'Partidas Perdidas' }
          ];
        this.percentageChartLabels =  this.nombresParejasPorcentajes.splice(0,3) ;
        this.percentageChartDatasets= [
            { data:this.porcentajeVictorias.splice(0,3), label: 'Porcentaje Victorias' }
          ];
      },
      (error) => {
        console.log('error en recuperar estadisticas jugadores');
      }
    );
    this.getParejas();
  }
  getParejas() {
    console.log("entramos a recuperar parejas")
    this.parejaService.getParejas().subscribe(
      (parejas) => {
        this.parejas = parejas;
        console.log('Parejas' + JSON.stringify(this.parejas));
      },
      (error) => {
        this.modalService.openModalError('Error recuperando parejas' + error.error.message);
        console.log('error');
      }
    );
  }
  goDetail(id: number, action: string) {
    this.detalle = false;
    this.identificador = id;
    this.parejaDetalle = this.parejas?.find((pareja) => id === pareja.id);
    this.tipo = action;
    this.detalle = true;
  }
  createMatch() {
    this.goDetail(0, 'A');
  }
  eliminarPareja(id: number) {
    this.parejaService.deletePareja(id).subscribe((resultado: Boolean) => {
      if (resultado) {
        console.log('Se ha eliminado el registro:' + id);
        //Mostrar mensaje modal
        this.modalService.openModalInfo(
          'Registro eliminado-Se ha eliminado el registro:' + id
        );
      } else {
        console.log('error!!!!!');
      }
    });
  }

  getEstadisticasParejas(){
    return this.parejaService.getEstadisticasParejas();
  }
  
  toggleCharts() {
    this.isFirstChartVisible = !this.isFirstChartVisible;
  }
}
