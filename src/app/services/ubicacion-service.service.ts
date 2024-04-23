import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, pipe, tap } from 'rxjs';
import { Ubicacion } from '../models/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService{
 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private ubicacionUrl = 'http://localhost:8080/api/ubicacion/';  // URL to web api
  constructor(
    private http: HttpClient) { }


  
    getUbicaciones(): Observable<any> {
      const token= sessionStorage.getItem("access_token");
    const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
     return this.http.get(this.ubicacionUrl+'findAll', {headers});
    }

    addUbicacion(ubicacion: Ubicacion): Observable<any> {
      const token= sessionStorage.getItem("access_token");
      const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
       return this.http.post(this.ubicacionUrl+'insert',ubicacion, {headers});
    }


    modifyUbicacion(ubicacion: Ubicacion): Observable<any> {
      const token= sessionStorage.getItem("access_token");
      const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
      return this.http.put(this.ubicacionUrl+'update/'+`${ubicacion.id}`,ubicacion, {headers});
    }

    deleteUbicacion(id: number):Observable<HttpResponse<any>> {
      const token= sessionStorage.getItem("access_token");
      const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
      return this.http.delete(this.ubicacionUrl+'delete/'+`${id}`, {headers, observe: 'response' });
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
