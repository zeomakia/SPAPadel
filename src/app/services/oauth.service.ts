import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest';
import { tap } from 'rxjs/operators';
import { userProfile } from '../models/userProfile';

/**
 * Servicio para manejar la autenticación OAuth.
 * @class
 */
@Injectable({
  providedIn: 'root'
})
export class OauthService {
  /**
   * Opciones para las solicitudes HTTP.
   * @type {any}
   */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Constructor del servicio de autenticación OAuth.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar las solicitudes.
   */
  constructor(private http: HttpClient) { }

  /**
   * Observable para saber si el usuario está autenticado.
   * @type {BehaviorSubject<boolean>}
   */
  private loggedIn = new BehaviorSubject<boolean>(false);

  /**
   * Método para obtener el estado de autenticación del usuario.
   * @returns {Observable<boolean>} - Observable que emite el estado de autenticación del usuario.
   */
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  /**
   * Método para iniciar sesión.
   * @method
   * @param {string} username - Nombre de usuario.
   * @param {string} password - Contraseña.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  login(username: string, password: string): Observable<any> {
    const request: LoginRequest = { username, password };
    return this.http.post('http://localhost:8080/api/auth/signin', request)
      .pipe(
        tap(response => {
          this.loggedIn.next(true);
        })
      );
  }

  /**
   * Método para registrar un nuevo usuario.
   * @method
   * @param {userProfile} formulario - Perfil de usuario a registrar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  singUpComponent(formulario: userProfile): Observable<any> {
    const request = formulario;
    return this.http.post('http://localhost:8080/api/auth/jugador/signup', request)
      .pipe(
        tap(response => {
          this.loggedIn.next(true);
        })
      );
  }

  /**
   * Método para obtener información de un usuario.
   * @method
   * @param {String} username - Nombre de usuario.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  getUser(username: String): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const request = username;
    return this.http.get('http://localhost:8080/api/jugador/' + username, { headers })
      .pipe(
        tap(response => {
          this.loggedIn.next(true);
        })
      );
  }

  /**
   * Método para actualizar información de un usuario.
   * @method
   * @param {userProfile} user - Perfil de usuario a actualizar.
   * @returns {Observable<any>} - Observable que emite la respuesta de la solicitud.
   */
  updateUser(user: userProfile): Observable<any> {
    const token = sessionStorage.getItem("access_token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const username = sessionStorage.getItem('user');
    return this.http.put('http://localhost:8080/api/jugador/update/' + username, user, { headers })
      .pipe(
        tap(response => {
          this.loggedIn.next(true);
        })
      );
  }

  /**
   * Método para cerrar sesión.
   * @method
   */
  logout() {
    this.loggedIn.next(false);
  }
}
