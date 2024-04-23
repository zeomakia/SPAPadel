import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';
import { EstadisticasParejasJugador } from '../models/estadisticasParejasJugador';

@Injectable({
  providedIn: 'root'
})
export class ParejaService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private parejasUrl = 'http://localhost:8080/api/pareja/';  // URL to web api
  constructor(
    private http: HttpClient) { }


  
    getParejas(): Observable<Pareja[]> {
      const token= sessionStorage.getItem("access_token");
      const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
      return this.http.get<Pareja[]>(this.parejasUrl+'findAll',{headers});
     
    } 

    getPareja(id?: number): Observable<Pareja>{
      const token= sessionStorage.getItem("access_token");
      const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
      return this.http.get<Pareja>(this.parejasUrl+id,{headers});
    }

  updatePareja(pareja:Pareja): Observable<any> {
    const token= sessionStorage.getItem("access_token");
    const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.http.put(this.parejasUrl, pareja, {headers});
  }
  /** Method to add new partida*/
  addPareja(pareja: Pareja): Observable<Pareja> {
    const token= sessionStorage.getItem("access_token");
    const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.http.post<Pareja>(this.parejasUrl+'insert', pareja, {headers});
  }
  
  /** DELETE: delete the pareja from the server */
  deletePareja(id: number): Observable<Boolean> {
    const url = `${this.parejasUrl}delete/${id}`;
    return this.http.delete<Boolean>(url, this.httpOptions);
  }

  getEstadisticasParejas(): Observable<EstadisticasParejasJugador> {
    const token= sessionStorage.getItem("access_token");
    const headers=new HttpHeaders().set('Authorization', `Bearer ${token}` );
    return this.http.get<EstadisticasParejasJugador>(this.parejasUrl+'estadisticas',{headers});
  }
  
}