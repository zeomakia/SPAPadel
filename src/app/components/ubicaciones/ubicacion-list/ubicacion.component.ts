/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent {
  
  ubicaciones!: Ubicacion[];
  tipo: any;
  ubicacion: Ubicacion | undefined;
  detalle: boolean = false;
  constructor(private ubicacionService: UbicacionService, private modalService: ModalService) { }

  ngOnInit() {
   this.getUbicaciones()
    .subscribe( 
      (ubicaciones)=> { this.ubicaciones = ubicaciones},
      (error)=> {this.modalService.openModalError("Error recuperando ubicaciones"+error)}
    );
     }

  getUbicaciones(): Observable<Ubicacion[]> {
    return this.ubicacionService.getUbicaciones();
     
  }

  goDetail(id: number,action: string){
    this.ubicacion=this.ubicaciones.find(ubicacion => ubicacion.id === id);
    this.tipo=action;
    this.detalle=true;
  }
  goBorrar(id: number){
  // this.
  }
  createUbicacion(){
    this.detalle=true;
    this.tipo='A';
  }

  cerrarHijo(){
    this.detalle=false;
  }
  actualizarLista(){
    this.ngOnInit;
  }
}



