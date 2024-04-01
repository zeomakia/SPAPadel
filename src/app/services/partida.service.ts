import { Injectable } from '@angular/core';
import { Partida } from '../models/partida';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { PartidaOutDTO } from '../models/partidaOutDTO';
@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private partidasUrl = 'http://localhost:8080/api/partida/';  // URL to web api
  constructor(
    private http: HttpClient) { }

  //funcion especifica para añador el token
   addToken(){
    const token= sessionStorage.getItem("access_token");
    const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return headers;
  }  
  getPartidas(): Observable<Partida[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Partida[]>(this.partidasUrl+'findAll',{headers:this.addToken()})
  }

  getPartida(id: number): Observable<any> {
    const url = `${this.partidasUrl}${id}`;
    return this.http.get<Partida>(url,{headers:this.addToken()}).pipe(
      catchError(this.handleError<Partida>(`getHero id=${id}`))
    );
  }

  updatePartida(partida: Partida): Observable<any> {
    const partidaDTO: PartidaOutDTO={
      idParejaGanadora: parseInt(partida.parejaGanadora!),
      idParejaPerdedora: parseInt(partida.parejaGanadora===partida.pareja1?partida.pareja1:partida.pareja2),
      dia:partida?.dia,
      idUbicacion: parseInt(partida.ubicacion),
      resultado: partida.resultado,
  
    }
    return this.http.post(this.partidasUrl+`update/${partida.id}`, partidaDTO, {headers:this.addToken()}).pipe(
      catchError(this.handleError<any>('updatePArtida'))
    );
  }

  /** POST: add a new hero to the server */
addPartida(partida: Partida): Observable<Partida> {
  const partidaDTO: PartidaOutDTO={
    idParejaGanadora: parseInt(partida.pareja1),
    idParejaPerdedora: parseInt(partida.pareja2),
    dia:partida?.dia,
    idUbicacion: parseInt(partida.ubicacion),
    resultado: partida.resultado,

  }

  return this.http.post<Partida>(this.partidasUrl+'insert', partidaDTO, {headers:this.addToken()}).pipe(
    catchError(this.handleError<Partida>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deletePartida(partida: number): Observable<Boolean> {
  const url = `${this.partidasUrl}delete/${partida}`;

  return this.http.delete<Boolean>(url, {headers:this.addToken()}).pipe(
    catchError(this.handleError<Boolean>('deletePartida'))
  );
}


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

    


}



 