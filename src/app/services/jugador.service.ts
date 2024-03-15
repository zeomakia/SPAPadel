import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugadores } from 'src/app/models/jugadores';
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    private partidasUrl = 'http://localhost:8080/RWSPadel/api/jugador/findAll';  // URL to web api
    constructor(
      private http: HttpClient) { }
    getJugadores(): Observable<Jugadores[]> {
      // TODO: send the message _after_ fetching the heroes
      return this.http.get<Jugadores[]>(this.partidasUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Jugadores[]>('getJugadores', []))
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
