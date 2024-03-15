import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/loginRequest';
import { tap } from 'rxjs/operators';
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
    
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }
}