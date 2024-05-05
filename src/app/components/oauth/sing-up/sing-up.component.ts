import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { DataSource } from '@angular/cdk/collections';
import { userProfile } from 'src/app/models/userProfile';
import { catchError, of } from 'rxjs';

/**
 * Componente para el registro de usuarios.
 * @class
 */
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  /**
   * Formulario de registro.
   * @type {FormGroup}
   */
  registroForm!: FormGroup;

  /**
   * Lista de edades.
   * @type {number[]}
   */
  edades: number[] = Array.from({length:100},(_, i )=>i+1);

  /**
   * Indicador de ocultar contraseña.
   * @type {boolean}
   */
  hide:boolean=true;

  /**
   * Indicador de ocultar confirmación de contraseña.
   * @type {boolean}
   */
  hide2:boolean=true;

  /**
   * Constructor del componente SingUpComponent.
   * @constructor
   * @param {FormBuilder} formBuilder - Constructor de formularios.
   * @param {OauthService} oauthService - Servicio de autenticación.
   * @param {Router} router - Enrutador.
   * @param {ModalService} modalService - Servicio de modales.
   */
  constructor(private formBuilder: FormBuilder,private oauthService: OauthService,private router: Router,
              private modalService: ModalService) { 
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      user: ['', Validators.required],
      contraseña:['',Validators.required],
      contraseñaConfirm:['',Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
      RGPD:['',Validators.required]
    } ,{validator: [this.checkPasswords, this.checkEmail] });
  }

  /**
   * Método para validar si las direcciones de correo electrónico coinciden.
   * @method
   * @param {FormGroup} group - Grupo de formularios.
   * @returns {null | { notSameEmail: true }}
   */
  checkEmail(group: FormGroup){
    let pass1= group.get('email')?.value;
    let pass2 = group.get('emailConfirm')?.value;
    return pass1===pass2 ? null: { notSameEmail: true}
  }

  /**
   * Método para validar si las contraseñas coinciden.
   * @method
   * @param {FormGroup} group - Grupo de formularios.
   * @returns {null | { notSame: true }}
   */
  checkPasswords(group: FormGroup){
    let pass1= group.get('contraseña')?.value;
    let pass2 = group.get('contraseñaConfirm')?.value;
    return pass1===pass2 ? null: { notSame: true}
  }

  /**
   * Método que se ejecuta al enviar el formulario de registro.
   * @method
   * @returns {void}
   */
  onSubmit(): void {
    if(this.registroForm.valid){
     const request : userProfile={
      name:this.registroForm.get("nombre")?.value,
      apellidos:this.registroForm.get("apellidos")?.value,
      username:this.registroForm.get("user")?.value,
      email:this.registroForm.get("email")?.value,
      password:this.registroForm.get("contraseña")?.value,
      telefono:this.registroForm.get("telefono")?.value,
      edad:this.registroForm.get("edad")?.value,
      passwordActual:""
      }
      this.oauthService.singUpComponent(request).subscribe(
          (response) =>
          {
            console.log("Usuari: " + this.registroForm.get("user")?.value + " creat correctament!");
            this.modalService.openModalInfo("Benvingut/da! " + this.registroForm.get("user")?.value);
            this.router.navigate(['/login']);
          },
          (error)=>{
            console.log("Error.");
            this.modalService.openModalError("Ha ocurrido un error al registrarse: "+ error.error.message);
          }
        
      );
    }
    console.log(this.registroForm.value);
  }

  /**
   * Método para redirigir al inicio de sesión.
   * @method
   * @returns {void}
   */
  login() {
    console.log('Login User');
    this.router.navigate(['/login']);
  }

  /**
   * Método para alternar la visibilidad de la contraseña.
   * @method
   * @returns {void}
   */
  toggle(){
    this.hide=!this.hide;
  }

  /**
   * Método para alternar la visibilidad de la confirmación de la contraseña.
   * @method
   * @returns {void}
   */
  toggle2(){
    this.hide2=!this.hide2;
  }
}
