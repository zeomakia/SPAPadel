import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';
import { EstadisticasParejasJugador } from '../models/estadisticasParejasJugador';

/**
 * Servicio para gestionar parejas.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class ParejaService {

  /**
   * Opciones para las solicitudes HTTP.
   * @type {any}
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * URL para acceder a la API de parejas.
   * @type {string}
   */
  private parejasUrl = 'http://localhost:8080/api/pareja/';

  /**
   * Constructor del servicio de parejas.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener todas las parejas.
   * @method
   * @returns {Observable<Pareja[]>} - Observable que emite la lista de parejas.
   */
  getParejas(): Observable<Pareja[]> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pareja[]>(this.parejasUrl + 'findAll', { headers });
  }

  /**
   * Método para obtener una pareja por su ID.
   * @method
   * @param {number} [id] - ID de la pareja (opcional).
   * @returns {Observable<Pareja>} - Observable que emite la pareja.
   */
  getPareja(id?: number): Observable<Pareja> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pareja>(this.parejasUrl + (id ? id : ''), { headers });
  }

  /**
   * Método para actualizar una pareja existente.
   * @method
   * @param {Pareja} pareja - Pareja a actualizar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  updatePareja(pareja: Pareja): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.parejasUrl, pareja, { headers });
  }

  /**
   * Método para agregar una nueva pareja.
   * @method
   * @param {Pareja} pareja - Nueva pareja a agregar.
   * @returns {Observable<Pareja>} - Observable que emite la pareja agregada.
   */
  addPareja(pareja: Pareja): Observable<Pareja> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Pareja>(this.parejasUrl + 'insert', pareja, { headers });
  }

  /**
   * Método para eliminar una pareja.
   * @method
   * @param {number} id - ID de la pareja a eliminar.
   * @returns {Observable<Boolean>} - Observable que emite un valor booleano.
   */
  deletePareja(id: number): Observable<Boolean> {
    const url = `${this.parejasUrl}delete/${id}`;
    return this.http.delete<Boolean>(url, this.httpOptions);
  }

  /**
   * Método para obtener las estadísticas de las parejas.
   * @method
   * @returns {Observable<EstadisticasParejasJugador>} - Observable que emite las estadísticas.
   */
  getEstadisticasParejas(): Observable<EstadisticasParejasJugador> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<EstadisticasParejasJugador>(this.parejasUrl + 'estadisticas', { headers });
  }
}
