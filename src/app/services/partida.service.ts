import { Injectable } from '@angular/core';
import { Partida } from '../models/partida';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { PartidaOutDTO } from '../models/partidaOutDTO';

/**
 * Servicio para gestionar partidas.
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class PartidaService {
  /**
   * Opciones para las solicitudes HTTP.
   * @type {any}
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * URL para acceder a la API de partidas.
   * @type {string}
   */
  private partidasUrl = 'http://localhost:8080/api/partida/';

  /**
   * Constructor del servicio de partidas.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * Función para añadir el token a las cabeceras HTTP.
   * @method
   * @returns {HttpHeaders} - Cabeceras HTTP con el token añadido.
   */
  addToken() {
    const token = sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  /**
   * Método para obtener todas las partidas.
   * @method
   * @returns {Observable<Partida[]>} - Observable que emite la lista de partidas.
   */
  getPartidas(): Observable<Partida[]> {
    return this.http.get<Partida[]>(this.partidasUrl + 'findAll', {
      headers: this.addToken(),
    });
  }

  /**
   * Método para obtener una partida por su ID.
   * @method
   * @param {number} id - ID de la partida.
   * @returns {Observable<any>} - Observable que emite la partida.
   */
  getPartida(id: number): Observable<any> {
    const url = `${this.partidasUrl}${id}`;
    return this.http.get<Partida>(url, { headers: this.addToken() });
  }

  /**
   * Método para actualizar una partida existente.
   * @method
   * @param {Partida} partida - Partida a actualizar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  updatePartida(partida: Partida): Observable<any> {
    return this.http.post(this.partidasUrl + `update/${partida.id}`, partida, {
      headers: this.addToken(),
    });
  }

  /**
   * Método para agregar una nueva partida.
   * @method
   * @param {Partida} partida - Nueva partida a agregar.
   * @returns {Observable<Partida>} - Observable que emite la partida agregada.
   */
  addPartida(partida: Partida): Observable<Partida> {
    return this.http.post<Partida>(this.partidasUrl + 'insert', partida, {
      headers: this.addToken(),
    });
  }

  /**
   * Método para eliminar una partida.
   * @method
   * @param {number} partida - ID de la partida a eliminar.
   * @returns {Observable<Boolean>} - Observable que emite un valor booleano.
   */
  deletePartida(partida: number): Observable<Boolean> {
    const url = `${this.partidasUrl}delete/${partida}`;
    return this.http.delete<Boolean>(url, { headers: this.addToken() });
  }
}
