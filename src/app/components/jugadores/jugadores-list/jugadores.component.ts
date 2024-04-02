import { Component } from '@angular/core';
import { Jugadores } from 'src/app/models/jugadores';
import { JugadorService } from '../../../services/jugador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent {
  jugadores!: Jugadores[];
  tipo: any;
  jugador: Jugadores | undefined;
  detalle: boolean = false;
  constructor(private jugadorService: JugadorService) { }

  ngOnInit() {
   this.getJugadores()
    .subscribe(jugadores=> this.jugadores = jugadores);
  }

  getJugadores(): Observable<Jugadores[]> {
    return this.jugadorService.getJugadores()
     
  }

  goDetail(id: number,action: string){
    this.jugador=this.jugadores.find(jugador => jugador.id === id);
    this.tipo=action;
    this.detalle=true;
  }
  goBorrar(id: number){
  // this.
  }
}
