import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';

import { Partida } from '../../../models/partida';
import { PartidaService } from '../../../services/partida.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { Pareja } from '../../../models/pareja';
import { ParejaService } from '../../../services/pareja.service';
import { UbicacionService } from '../../../services/ubicacion-service.service';
import { Ubicacion } from '../../../models/ubicacion';
import { BrowserModule } from '@angular/platform-browser';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-partida-detail',
  templateUrl: './partida-detail.component.html',
  styleUrls: [ './partida-detail.component.scss' ],
})
export class PartidaDetailComponent implements OnInit {
  nuevaPartidaForm: FormGroup; 
  @Output() partidaCreada = new EventEmitter<void>();
  @Output() cerrarDetalle = new EventEmitter<void>();
  @Input() identificador!: number;
  @Input() tipo?: string;
  partida!: Partida;
  parejas: Pareja[]=[];
  ubicaciones: Ubicacion[]=[];
  disable: boolean=true;
  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private ubicacionService: UbicacionService,
    private parejaService: ParejaService,
    private location: Location,
    private modalService: ModalService
  ) {
    this.nuevaPartidaForm = new FormGroup({
      pareja1Form: new FormControl('', Validators.required),
      pareja2Form: new FormControl('', Validators.required),
      ubicacionForm: new FormControl('', Validators.required),
      parejaGanadoraForm: new FormControl ('',Validators.required),
      resultadoForm: new FormControl ('',Validators.required),
      diaForm: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.identificador==0){
      this.getParejas().subscribe(parejas => {
        this.parejas = parejas;
        this.getUbicaciones().subscribe(ubicaciones => {
          this.ubicaciones = ubicaciones;
          this.rellenarFormulario(this.partida, this.parejas, this.ubicaciones);
        });
      });
    }else{
      this.getPartida().subscribe(partida => {
        this.partida = partida;
        this.disable= this.tipo==='D';
        if(this.tipo==='M'){
          this.getParejas().subscribe(parejas => {
            this.parejas = parejas;
            this.getUbicaciones().subscribe(ubicaciones => {
              this.ubicaciones = ubicaciones;
              this.rellenarFormulario(this.partida, this.parejas, this.ubicaciones);
            });
          });
        } 
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.identificador==0){
      this.getParejas();
      this.getUbicaciones();
     }else{
      this.getPartida().subscribe(partida => {
        this.partida = partida;
        this.disable= this.tipo==='D';
        if(this.tipo==='M'){
          this.getParejas().subscribe(parejas => {
            this.parejas = parejas;
            this.getUbicaciones().subscribe(ubicaciones => {
              this.ubicaciones = ubicaciones;
              this.rellenarFormulario(this.partida, this.parejas, this.ubicaciones);
            });
          });
        } 
      });
     }
  }
  rellenarFormulario(partida: Partida, parejas:Pareja[],ubicaciones:Ubicacion[]){
    const pareja1 = parejas.find(pareja => pareja.nombrePareja === partida.pareja1);
    const pareja2 = parejas.find(pareja => pareja.nombrePareja === partida.pareja2);
    const ubicacion = ubicaciones.find(ubicacion => ubicacion.name === partida.ubicacion);
    const parejaGanadora = parejas.find(pareja => pareja.nombrePareja === partida.parejaGanadora);
  
    this.nuevaPartidaForm.setValue({
      pareja1Form: pareja1 ? pareja1.id : null,
      pareja2Form: pareja2 ? pareja2.id : null,
      ubicacionForm: ubicacion ? ubicacion.id : null,
      resultadoForm: partida.resultado,
      parejaGanadoraForm: parejaGanadora ? parejaGanadora.id : null,
      diaForm: partida.dia
    });
  }
  
  getPartida(): Observable<Partida> {
    return this.partidaService.getPartida(this.identificador);
  }
  getParejas(): Observable<Pareja[]>{
    return this.parejaService.getParejas();
  }
  getUbicaciones():Observable<Ubicacion[]>{
    return this.ubicacionService.getUbicaciones();
  }

  goBack(): void {
    // this.location.back();
    this.modalService.openModalInfo('Partida actualizada');
    this.cerrarDetalle.emit();
  }

  guardarNuevaPartida() {
    if (this.nuevaPartidaForm.valid) {
      // Crear una nueva instancia de Partida
      const nuevaPartida: Partida = {
        id: this.tipo==='M'?this.identificador:0,
        dia: this.nuevaPartidaForm.get('diaForm')?.value,
        pareja1: this.nuevaPartidaForm.get('pareja1Form')?.value,
        pareja2: this.nuevaPartidaForm.get('pareja2Form')?.value,
        parejaGanadora: this.nuevaPartidaForm.get('parejaGanadoraForm')?.value,
        ubicacion: this.nuevaPartidaForm.get('ubicacionForm')?.value,
        resultado: this.nuevaPartidaForm.get('resultadoForm')?.value
      };
  
      // Llamar al servicio con la nueva partida
      if(this.tipo==='M'){
        this.partidaService.updatePartida(nuevaPartida).subscribe(
          () => {
              this.partidaCreada.emit();
              this.goBack(); 
          },
          error => {
              console.error('Error al crear la partida: ', error);
              this.modalService.openModalError('Error al crear la partida: ' + error);
          }
      );
      }else{
      this.partidaService.addPartida(nuevaPartida).subscribe(
        () => {
            this.partidaCreada.emit();
            this.goBack(); 
        },
        error => {
            console.error('Error al crear la partida: ', error);
            this.modalService.openModalError('Error al crear la partida: ' + error);
        }
    );
    }
  }
  }
  
}