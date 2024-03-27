import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';

@Injectable({
  providedIn: 'root'
})
export class ParejaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private parejasUrl = 'http://localhost:8080/RWSPadel/api/parejas/';  // URL to web api
  constructor(
    private http: HttpClient) { }


  
    getParejas(): Observable<Pareja[]> {
      return this.http.get<Pareja[]>(this.parejasUrl+'findAll')
      .pipe(
        tap(_ => this.log('Get parejas')),
        catchError(this.handleError<Pareja[]>('getPartida', []))
      );
    } 

    getPareja(id?: number): Observable<Pareja>{
      return this.http.get<Pareja>(this.parejasUrl+id)
      .pipe(
        tap(_ => this.log('get pareja with id ='+id)),
        catchError(this.handleError<Pareja>('get pareja '))
      );
    }

  updatePareja(pareja:Pareja): Observable<any> {
    return this.http.put(this.parejasUrl, pareja, this.httpOptions).pipe(
      tap(_ => this.log(`delete pareja id=${pareja.id}`)),
      catchError(this.handleError<any>('delete pareja'))
      );
  }
  /** Method to add new partida*/
  addPareja(pareja: Pareja): Observable<Pareja> {
    return this.http.post<Pareja>(this.parejasUrl+'insert', pareja, this.httpOptions).pipe(
      tap((newPareja: Pareja) => this.log(`added pareja w/ id=${pareja.id}`)),
      catchError(this.handleError<Pareja>('addPareja'))
    );
  }
  
  /** DELETE: delete the pareja from the server */
  deletePareja(id: number): Observable<Boolean> {
    const url = `${this.parejasUrl}delete/${id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted partida id=${id}`)),
      catchError(this.handleError<Boolean>('deletePartida'))
    );
  }
  
  

  private log(message: string) {
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
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
