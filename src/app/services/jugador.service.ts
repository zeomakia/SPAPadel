import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugadores } from 'src/app/models/jugadores';
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs';
import { EstadisticasJugadores } from '../models/estadisticasJugadores';

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
      return this.http.get<Jugadores[]>(this.partidasUrl,{headers:this.addToken()})
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Jugadores[]>('getJugadores', []))
      );
    }

    getEstadisticasJugadores(): Observable<EstadisticasJugadores> {
      // TODO: send the message _after_ fetching the heroes
      return this.http.get<EstadisticasJugadores>(this.jugadoresEstadisticasUrl,{headers:this.addToken()})
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<EstadisticasJugadores>('getEstadisticasJugadores'))
      );
    }

    private log(message: string) {
    }
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    
}
