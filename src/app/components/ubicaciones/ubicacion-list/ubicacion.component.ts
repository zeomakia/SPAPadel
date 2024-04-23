/// <reference types="@types/googlemaps" />
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { HttpResponse } from '@angular/common/http';

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
  p: number = 1;

  constructor(private ubicacionService: UbicacionService, private modalService: ModalService,
    private readonly cd: ChangeDetectorRef)  { }

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
   this.ubicacionService.deleteUbicacion(id).subscribe(
    (response: HttpResponse<any>)=> {
      console.log(response);
      const mensaje = response.body && response.body.message ? response.body.message : "Ubicacion borrada correctamente.";
      this.modalService.openModalInfo(mensaje)
      this.actualizarLista()
    },
    (err)=>  {this.modalService.openModalError("Ha habido un error borrando la ubicación.");}
   );
  }
  createUbicacion(){
    this.detalle=false;
    this.tipo='A';
    this.detalle=true;
  }

  cerrarHijo(){
    this.detalle=false;
  }
  actualizarLista(){
    this.getUbicaciones()
    .subscribe( 
      (ubicaciones)=> { this.ubicaciones = ubicaciones},
      (error)=> {this.modalService.openModalError("Error recuperando ubicaciones"+error)}
    );
  }
}



