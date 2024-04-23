import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugadores } from 'src/app/models/jugadores';
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs';
import { EstadisticasJugadores } from '../models/estadisticasJugadores';
import { EstadisticasParejasJugador } from '../models/estadisticasParejasJugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    private partidasUrl = 'http://localhost:8080/api/jugador/findAll';
    private jugadoresEstadisticasUrl = 'http://localhost:8080/api/jugador/estadisticas';  // URL to web api
    constructor(
      private http: HttpClient) { }


    addToken(){
      const token= sessionStorage.getItem("access_token");
      const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
      return headers;
    }    
    getJugadores(): Observable<Jugadores[]> {
      // TODO: send the message _after_ fetching the heroes
      return this.http.get<Jugadores[]>(this.partidasUrl,{headers:this.addToken()});
    }

    getEstadisticasJugadores(): Observable<EstadisticasJugadores> {
      // TODO: send the message _after_ fetching the heroes
      return this.http.get<EstadisticasJugadores>(this.jugadoresEstadisticasUrl,{headers:this.addToken()});
    }

    getEstadisticasParejasJugador(jugadorId:number):Observable<EstadisticasParejasJugador>{
      return this.http.get<EstadisticasParejasJugador>(this.jugadoresEstadisticasUrl+'/'+jugadorId,{headers:this.addToken()});

    }
}
