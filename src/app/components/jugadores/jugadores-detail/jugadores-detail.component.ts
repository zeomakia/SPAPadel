import { ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges, output } from '@angular/core';
import {FormControl, FormGroup,Validators,FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import {Jugadores} from 'src/app/models/jugadores';
import {EstadisticasParejasJugador} from 'src/app/models/estadisticasParejasJugador';
import { JugadorService } from 'src/app/services/jugador.service';
@Component({
  selector: 'app-jugadores-detail',
  templateUrl: './jugadores-detail.component.html',
  styleUrls: ['./jugadores-detail.component.scss']
})
export class JugadoresDetailComponent {
  jugadorForm: FormGroup;  
  @Input() jugador?: Jugadores;
  @Input() tipo!: string;
  @Output() cerrarDetalle = new EventEmitter<void>();
  disable : boolean=true;
  doughnutChartLabels: string[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [  ];
  ganadasChartLabels: string[] = [];
  ganadasChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [  ];
  porcentaje: number=0;
  percentageChartLabels: string[] = [];
  percentageChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [  ];
  partidasGanadas:number []=[];
  partidasPerdidas:number []=[];
  porcentajeVictorias:number []=[];
  nombresJugadores: string [] = [];
  nombresJugadoresPorcentajes: string [] = [];
  estadisticasParejasJugador!:EstadisticasParejasJugador;
  constructor(
    private route: ActivatedRoute,
    private jugadorService: JugadorService,
  ){
    this.jugadorForm=new FormGroup({
      jugadorIdForm : new FormControl('',Validators.required),
      nameForm: new FormControl('',Validators.required),
      apellidosForm: new FormControl('',Validators.required),
      usernameForm: new FormControl('', Validators.required),
      edadForm:  new FormControl(' ',Validators.required)
    });
  }
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };
  public ganadasChartOptions: ChartConfiguration<'bar'>['options'] = {
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
        }
    }
  };
  goBack():void{
    this.cerrarDetalle.emit();
  }
  rellenarForm(){
    if(this.tipo!=='A'){
      this.jugadorForm.setValue({
        jugadorIdForm : this.jugador?.id,
        nameForm : this.jugador?.name,
        apellidosForm : this.jugador?.apellidos,
        usernameForm : this.jugador?.username,
        edadForm : this.jugador?.edad
      });
      if(this.tipo==='D')
      this.deshabilitarForm();
    }else{
      console.log("Deshabilitamos")
    this.habilitarForm(); 
    }

  }
  rellenarEstadisticas() {

    let ganadas: number = this.jugador===undefined?0:this.jugador?.partidasGanadas;
    let perdidas: number= this.jugador===undefined?0:this.jugador?.partidasPerdidas;
    let jugadas: number = this.jugador===undefined?0:this.jugador?.partidasJugadas;
    this.porcentaje = (ganadas / jugadas) * 100;
    // Redondea el porcentaje a dos decimales
    this.porcentaje = parseFloat(this.porcentaje.toFixed(0));
    this.doughnutChartLabels =  ['Partidas Ganadas','Partidas Perdidas'];
        this.doughnutChartDatasets= [
            { data:[ganadas,perdidas] }]
    this.getEstadisticasParejas(this.jugador===undefined?0:this.jugador?.id);    
  }
  getEstadisticasParejas(jugadorId:number){
    this.getEstadisticasParejasJugador(jugadorId).subscribe(
      (estadisticas) => {
        this.estadisticasParejasJugador = estadisticas;
        console.log('Estadisticas' + JSON.stringify(this.estadisticasParejasJugador));
        this.partidasGanadas=this.estadisticasParejasJugador.partidasGanadas;
        this.partidasPerdidas=this.estadisticasParejasJugador.partidasPerdidas;
        this.porcentajeVictorias=this.estadisticasParejasJugador.porcentajeVictorias;
        this.nombresJugadores=this.estadisticasParejasJugador.names;
        this.nombresJugadoresPorcentajes=this.estadisticasParejasJugador.namesPorcentaje;
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
        this.ganadasChartLabels =  this.nombresJugadores.splice(0,3) ;
        this.ganadasChartDatasets= [
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

  }
  getEstadisticasParejasJugador(jugadorId:number): Observable<EstadisticasParejasJugador> {
    return this.jugadorService.getEstadisticasParejasJugador(jugadorId);
  }
  ngOnChanges(changes: any): void {
    if (changes.jugador && this.jugador) {
      this.rellenarEstadisticas();
    }
  }
  deshabilitarForm(){
    this.jugadorForm.get('jugadorIdForm')?.disable();
    this.jugadorForm.get('nameForm')?.disable();
    this.jugadorForm.get('apellidosForm')?.disable();
    this.jugadorForm.get('usernameForm')?.disable();
    this.jugadorForm.get('edadForm')?.disable();
  }
  habilitarForm(){
    this.jugadorForm.get('jugadorIdForm')?.disable();
    this.jugadorForm.get('nameForm')?.enable();
    this.jugadorForm.get('apellidosForm')?.enable();
    this.jugadorForm.get('usernameForm')?.enable();
    this.jugadorForm.get('edadForm')?.enable();
  }
}
