import { Component } from '@angular/core';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  
  
  
  constructor(private oauthService: OauthService,private router: Router,
              private modalService: ModalService) {
    this.loginForm = new FormGroup({
      usernameForm: new FormControl('', Validators.required),
      passwordForm: new FormControl('', Validators.required),
    });
  } 
    username:any;


  login() {
    if(this.loginForm.valid){
      this.oauthService.login(
        this.loginForm.get('usernameForm')?.value,
      this.loginForm.get('passwordForm')?.value).pipe(
        catchError(error => {
          // Maneja el error aquí
          console.log(error);
          this.modalService.openModalError('Ha ocurrido un error durante el inicio de sesión');
          // Puedes retornar un nuevo valor u Observable si lo necesitas
          return of(null);
        })
      ).subscribe(response => {
        if (response.token) {
          // Guarda el token en el almacenamiento local
          localStorage.setItem('access_token', response.token); 
          this.router.navigate(['/jugadores']);
        } else {
          console.log('Usuario o contraseña incorrectos');
          this.modalService.openModalError('Usuario o contraseña incorrectos');
        }
      });
    }
  }

  register() {
    // Aquí puedes implementar la lógica para registrarse
    console.log('Registering user');
    this.router.navigate(['/singup']);
  }

}