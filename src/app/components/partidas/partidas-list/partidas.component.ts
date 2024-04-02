import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Partida } from '../../../models/partida';
import { PartidaService } from '../../../services/partida.service';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss']
})
export class PartidasComponent {
  p: number = 1;
  partidas: Partida[] = [];
  identificador : any;
  tipo: any;
  detalle:boolean =false;
  @ViewChild('hijoRef', { read: ElementRef }) hijo!: ElementRef;


  constructor(private partidaService: PartidaService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPartidas().subscribe(partidas=>{
      this.partidas = partidas;
      console.log("Partidos:", this.partidas); // Mueve el console.log aquí
      
    });
  }

  getPartidas(): Observable<Partida[]> {
   return this.partidaService.getPartidas();
  }
  goDetail(id: number,action: string){
    this.detalle=false
    this.identificador=id;
    this.tipo=action;
    this.detalle=true;
    setTimeout(() => {
      if(this.hijo!== undefined)
        this.hijo.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    
  }
  createMatch(){
    this.goDetail(0,'A');
  }
  cerrarHijo(){
    this.detalle=false;
    window.scrollTo(0, 0)
  } 
  eliminarPartida(id: number){
    this.partidaService.deletePartida(id)
    .subscribe((resultado: Boolean )=>{
      if(resultado)
      {
        console.log('Se ha eliminado el registro:'+id);
        this.modalService.openModalInfo("Registro eliminado correctamente");
        this.getPartidas();
      }else{
       console.log("error!!!!!")
     }
   });
  }

    
}


