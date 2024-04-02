import { ChangeDetectorRef, Component, Input, NgModule, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
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
@Component({
  selector: 'app-parejas-detail',
  templateUrl: './parejas-detail.component.html',
  styleUrls: ['./parejas-detail.component.scss'],
})
export class ParejasDetailComponent implements OnInit{
    nuevaParejaForm: FormGroup; 
    @Input() identificador!: number;
    @Input() tipo?: string;
    @Input() pareja?: Pareja;
    parejas: Pareja[]=[];
    jugadores: Jugadores[]=[];
    disable: boolean=true;
    isParejaNueva:boolean=false;
    constructor(
      private route: ActivatedRoute,
      private partidaService: PartidaService,
      private ubicacionService: UbicacionService,
      private parejaService: ParejaService,
      private jugadorService: JugadorService,
      private location: Location,
      private readonly cd: ChangeDetectorRef,
      private modalService: ModalService,
      
    ) {
      this.nuevaParejaForm = new FormGroup({
        jugador1Form: new FormControl('', Validators.required),
        jugador2Form: new FormControl('', Validators.required),
      });
    }
     // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 355, 450, 100,133], label: 'Series A' },
      // { data: [ 50, 150, 120 ], label: 'Series B' },
      // { data: [ 250, 130, 70 ], label: 'Series C' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  
    ngOnInit(): void {
      console.log("Pareja init "+ JSON.stringify(this.pareja));
      if(this.identificador==0){
      
       this.isParejaNueva=true;
       this.getJugadores();
      }else{
        this.getParejas().subscribe(parejas =>  this.parejas = parejas);
        console.log("Pareja"+ JSON.stringify(this.pareja));
      this.disable= this.tipo==='D';
      }
    }
    ngOnChanges(changes: SimpleChanges): void {
      console.log("Pareja change"+ JSON.stringify(this.pareja));
      if(this.identificador==0){
        this.isParejaNueva=true;
        this.getParejas().subscribe(parejas =>  this.parejas = parejas);
        console.log("Lista parejas" + this.parejas);
   
       }else{
        this.isParejaNueva=false;
        console.log("Pareja"+ JSON.stringify(this.pareja));
        this.getParejas().subscribe(parejas =>  this.parejas = parejas);
        console.log("Lista parejas" + this.parejas);
       this.disable= this.tipo==='D';
       }
    }
  
    // getPareja(id: number): void {
    //   this.parejaService.getPareja(id)
    //     .subscribe(pareja => this.pareja = pareja);
    // }

    getJugadores():void{
      this.jugadorService.getJugadores()
        .subscribe(jugadores =>  this.jugadores = jugadores);
     console.log("Lista jugadores" + this.jugadores);
    }

    getParejas():Observable<Pareja[]>{
      return this.parejaService.getParejas();
        
    }

  
    goBack(): void {
      this.location.back();
    }
  
    save(): void {
      this.parejaService.updatePareja(this.pareja!)
        .subscribe(() => this.goBack());
        this.modalService.openModalInfo('Pareja actualizada');
    }
    guardarNuevaPareja() {
      if (this.nuevaParejaForm.valid) {
        // Crear una nueva instancia de PAreja
        const nuevaPareja: Pareja = {
          id: 0, // O el valor por defecto que desees para el nuevo id
          jugador1: this.nuevaParejaForm.get('jugador1Form')?.value,
          jugador2: this.nuevaParejaForm.get('jugador2Form')?.value,
          // P_ganadas: this.nuevaParejaForm.get('partidasGanadasForm')?.value,
          // P_jugadas: this.nuevaParejaForm.get('partidasJugadasForm')?.value,
          // P_perdidas: this.nuevaParejaForm.get('partidasPerdidasForm')?.value,
        };
    
        // Llamar al servicio con la nueva partida
        this.parejaService.addPareja(nuevaPareja)
          .subscribe(() => this.goBack());
          this.modalService.openModalInfo('Pareja creada');
      }
    }
    
  
}
