import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jugadores } from 'src/app/models/jugadores';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EstadisticasJugadores } from '../models/estadisticasJugadores';
import { EstadisticasParejasJugador } from '../models/estadisticasParejasJugador';

/**
 * Servicio para gestionar jugadores.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  /**
   * Opciones para las solicitudes HTTP.
   * @type {any}
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * URL para obtener la lista de jugadores.
   * @type {string}
   */
  private partidasUrl = 'http://localhost:8080/api/jugador/findAll';

  /**
   * URL para obtener las estadísticas de jugadores.
   * @type {string}
   */
  private jugadoresEstadisticasUrl = 'http://localhost:8080/api/jugador/estadisticas';

  /**
   * Constructor del servicio de jugadores.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para añadir el token de autenticación a las solicitudes HTTP.
   * @method
   * @returns {HttpHeaders} - Encabezados HTTP con el token de autenticación.
   */
  addToken() {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  /**
   * Método para obtener la lista de jugadores.
   * @method
   * @returns {Observable<Jugadores[]>} - Observable que emite la lista de jugadores.
   */
  getJugadores(): Observable<Jugadores[]> {
    return this.http.get<Jugadores[]>(this.partidasUrl, { headers: this.addToken() });
  }

  /**
   * Método para obtener las estadísticas de jugadores.
   * @method
   * @returns {Observable<EstadisticasJugadores>} - Observable que emite las estadísticas de jugadores.
   */
  getEstadisticasJugadores(): Observable<EstadisticasJugadores> {
    return this.http.get<EstadisticasJugadores>(this.jugadoresEstadisticasUrl, { headers: this.addToken() });
  }

  /**
   * Método para obtener las estadísticas de parejas de un jugador específico.
   * @method
   * @param {number} jugadorId - ID del jugador.
   * @returns {Observable<EstadisticasParejasJugador>} - Observable que emite las estadísticas de parejas del jugador.
   */
  getEstadisticasParejasJugador(jugadorId: number): Observable<EstadisticasParejasJugador> {
    return this.http.get<EstadisticasParejasJugador>(this.jugadoresEstadisticasUrl + '/' + jugadorId, { headers: this.addToken() });
  }
}
