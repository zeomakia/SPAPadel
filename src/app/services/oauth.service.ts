import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest';
import { tap } from 'rxjs/operators';
import { userProfile } from '../models/userProfile';
@Injectable({
  providedIn: 'root'
})
export class OauthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

    login(username: string, password: string): Observable<any> {
        const request: LoginRequest = { username, password };
        return this.http.post('http://localhost:8080/api/auth/signin', request)
        .pipe(
         tap(response => {
      this.loggedIn.next(true);
    })
  );
  }

  singUpComponent(formulario: userProfile): Observable<any> {
    const request= formulario;
        return this.http.post('http://localhost:8080/api/auth/jugador/signup', request)
    .pipe(
     tap(response => {
  this.loggedIn.next(true);
  })
    );
  }

    getUser(username: String): Observable<any>{

      const token= sessionStorage.getItem("access_token");
      const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
      const request= username;
      return this.http.get('http://localhost:8080/api/jugador/'+username, {headers})
      .pipe(
      tap(response => {
        this.loggedIn.next(true);
      })
    );
  }
  
  updateUser(user: userProfile): Observable<any>{
    const token= sessionStorage.getItem("access_token");
    const headers =new HttpHeaders().set('Authorization', `Bearer ${token}` );
    const username= sessionStorage.getItem('user')
    return this.http.put('http://localhost:8080/api/jugador/update/'+username,user, {headers})
    .pipe(
    tap(response => {
      this.loggedIn.next(true);
    })
  );
}
   
  

  logout() {
    this.loggedIn.next(false);
  }
}