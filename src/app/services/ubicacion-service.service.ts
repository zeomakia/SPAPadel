import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Ubicacion } from '../models/ubicacion';

/**
 * Servicio para gestionar ubicaciones.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  /**
   * Opciones para las solicitudes HTTP.
   * @type {any}
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * URL para acceder a la API de ubicaciones.
   * @type {string}
   */
  private ubicacionUrl = 'http://localhost:8080/api/ubicacion/';

  /**
   * Constructor del servicio de ubicaciones.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para obtener todas las ubicaciones.
   * @method
   * @returns {Observable<any>} - Observable que emite la lista de ubicaciones.
   */
  getUbicaciones(): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.ubicacionUrl + 'findAll', { headers });
  }

  /**
   * Método para agregar una nueva ubicación.
   * @method
   * @param {Ubicacion} ubicacion - La ubicación a agregar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  addUbicacion(ubicacion: Ubicacion): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.ubicacionUrl + 'insert', ubicacion, { headers });
  }

  /**
   * Método para modificar una ubicación existente.
   * @method
   * @param {Ubicacion} ubicacion - La ubicación a modificar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  modifyUbicacion(ubicacion: Ubicacion): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.ubicacionUrl + 'update/' + `${ubicacion.id}`, ubicacion, { headers });
  }

  /**
   * Método para eliminar una ubicación.
   * @method
   * @param {number} id - El ID de la ubicación a eliminar.
   * @returns {Observable<HttpResponse<any>>} - Observable que emite la respuesta de la solicitud.
   */
  deleteUbicacion(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(this.ubicacionUrl + 'delete/' + `${id}`, { headers, observe: 'response' });
  }

  /**
   * Maneja la operación HTTP que falló.
   * Permite que la aplicación continúe.
   * @method
   * @param {string} operation - Nombre de la operación que falló.
   * @param {T} result - Valor opcional para devolver como resultado observable.
   * @returns {Observable<T>} - Observable que emite el resultado.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
