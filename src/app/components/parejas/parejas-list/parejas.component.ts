import { ChangeDetectorRef, Component } from '@angular/core';
import { Pareja } from 'src/app/models/pareja';
import { ModalService } from 'src/app/services/modal.service';
import { ParejaService } from 'src/app/services/pareja.service';

@Component({
  selector: 'app-parejas',
  templateUrl: './parejas.component.html',
  styleUrls: ['./parejas.component.scss']
})
export class ParejasComponent {
  parejas: Pareja[]=[];
  identificador : any;
  tipo: any;
  parejaDetalle? :Pareja;
  detalle:boolean =false;
  p: number = 1;

  constructor(private parejaService: ParejaService,
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService) { }


  ngOnInit(){
    this.getParejas();
    console.log("Parejas"+ JSON.stringify(this.parejas));
  }
  getParejas() {
    this.parejaService.getParejas()
      .subscribe(parejas=> this.parejas = parejas);

  }
  goDetail(id: number,action: string){
    this.detalle=false
    this.identificador=id;
    this.parejaDetalle= this.parejas?.find(pareja=>id=== pareja.id);
    this.tipo=action;
    this.detalle=true;
  }
  createMatch(){
    this.goDetail(0,'A');
  }
  eliminarPareja(id: number){
    this.parejaService.deletePareja(id)
    .subscribe((resultado: Boolean )=>{
      if(resultado)
      {
        console.log('Se ha eliminado el registro:'+id);
        //Mostrar mensaje modal
        this.modalService.openModalInfo("Registro eliminado-Se ha eliminado el registro:"+id);
      }else{
       console.log("error!!!!!")
     }
   });
  }
}