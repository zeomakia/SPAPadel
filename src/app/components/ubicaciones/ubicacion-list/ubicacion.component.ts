/// <reference types="@types/googlemaps" />
import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
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
    (status)=> {this.modalService.openModalInfo("Ubicacion borrada correctamente.");},
    (err)=>  {this.modalService.openModalError("Ha habido un error borrando la ubicación.");}
   );
    this.getUbicaciones()
    .subscribe( 
      (ubicaciones)=> { this.ubicaciones = ubicaciones},
      (error)=> {this.modalService.openModalError("Error recuperando ubicaciones"+error)}
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



