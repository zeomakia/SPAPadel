import { ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges, output } from '@angular/core';
import {FormControl, FormGroup,Validators,FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import {Jugadores} from 'src/app/models/jugadores';
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
  porcentaje: number=0;

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
    }else
    this.habilitarForm 

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
