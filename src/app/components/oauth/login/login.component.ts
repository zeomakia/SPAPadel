import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * Componente para el inicio de sesión de usuarios.
 * @class
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  /**
   * Formulario de inicio de sesión.
   * @type {FormGroup}
   */
  loginForm!: FormGroup;

  /**
   * Indicador de ocultar la contraseña.
   * @type {boolean}
   */
  hide: boolean = true;

  /**
   * Constructor del componente LoginComponent.
   * @constructor
   * @param {OauthService} oauthService - Servicio de autenticación.
   * @param {Router} router - Enrutador.
   * @param {ModalService} modalService - Servicio de modales.
   */
  constructor(
    private oauthService: OauthService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.loginForm = new FormGroup({
      usernameForm: new FormControl('', Validators.required),
      passwordForm: new FormControl('', Validators.required),
    });
  } 
  ngOnInit(): void {
   let singup= sessionStorage.getItem('singUp');

   if(singup ){
    sessionStorage.removeItem('singUp');
    window.location.reload();
   }else{
    if(sessionStorage.getItem('newUser')){
      this.modalService.openModalInfo("Bienvenid@! " + sessionStorage.getItem('newUser'));
      sessionStorage.removeItem('newUser');
    }
  }
  }

  /**
   * Método para iniciar sesión.
   * @method
   * @returns {void}
   */
  login() {
    if(this.loginForm.valid){
      this.oauthService.login(
        this.loginForm.get('usernameForm')?.value,
        this.loginForm.get('passwordForm')?.value
      ).subscribe(
        (response) => {
          if (response.token) {
            // Guarda el token en el almacenamiento local
            sessionStorage.setItem('access_token', response.token);
            sessionStorage.setItem('user', response.username);
            sessionStorage.setItem('userId',response.id);
            this.router.navigate(['/partidas']);
          }
        },
        (error) => {
          console.log('Usuario o contraseña incorrectos');
          this.modalService.openModalError('Usuario o contraseña incorrectos');
        }
      );
    }
  }

  /**
   * Método para navegar a la página de registro.
   * @method
   * @returns {void}
   */
  register() {
    console.log('Registering user');
    this.router.navigate(['/singup']);
  }
  
  /**
   * Método para alternar la visibilidad de la contraseña.
   * @method
   * @returns {void}
   */
  toggle() {
    this.hide = !this.hide;
  }
}
