import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { userProfile } from 'src/app/models/userProfile';
import { ModalService } from 'src/app/services/modal.service';
import { OauthService } from 'src/app/services/oauth.service';

/**
 * Componente para gestionar el perfil de usuario.
 * @class
 */
@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  /**
   * Formulario para el perfil de usuario.
   * @type {FormGroup}
   */
  perfilUser!: FormGroup;

  /**
   * Indicador para mostrar u ocultar el cambio de contraseña.
   * @type {boolean}
   */
  showChangePassword = false;

  /**
   * Indicador para mostrar u ocultar los datos del usuario.
   * @type {boolean}
   */
  mostrarDatos = false;

  /**
   * Indicador para ocultar o mostrar el campo de contraseña actual.
   * @type {boolean}
   */
  hide: boolean = true;

  /**
   * Indicador para ocultar o mostrar el campo de nueva contraseña.
   * @type {boolean}
   */
  hide2: boolean = true;

  /**
   * Indicador para ocultar o mostrar el campo de confirmación de contraseña.
   * @type {boolean}
   */
  hide3: boolean = true;

  /**
   * Constructor del componente PerfilUserComponent.
   * @constructor
   * @param {FormBuilder} formBuilder - Constructor de formularios.
   * @param {Router} router - Enrutador de Angular.
   * @param {OauthService} ouathService - Servicio de autenticación OAuth.
   * @param {ModalService} modalService - Servicio de modales.
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ouathService: OauthService,
    private modalService: ModalService
  ) {
    this.perfilUser = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      user: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', Validators.required),
      actualPassword: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    }, { validator: this.checkPasswords });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * @method
   * @returns {void}
   */
  ngOnInit() {
    this.obtenerDatosUsuario().subscribe(
      respuesta => {
        this.rellenarFormulario(respuesta);
        console.log("Usuario:" + this.perfilUser);
        console.log("respuesta:" + respuesta.data);
        this.mostrarDatos = true;
      },
      error => {
        console.error('Error al obtener el usuario:', error);
        this.modalService.openModalError("Ha ocurrido un error recuperando el usuario.")
        // Aquí puedes manejar el error según tus necesidades
      }
    );
  }

  /**
   * Método para obtener los datos del usuario.
   * @method
   * @returns {Observable<any>} - Observable de los datos del usuario.
   */
  obtenerDatosUsuario(): Observable<any> {
    const user = sessionStorage.getItem('userId')!;
    if (user !== null) {
      return this.ouathService.getUser(user);
    } else {
      this.modalService.openModalError("Ha ocurrido un error recuperando el usuario de la sesión.");
      return throwError("No se encontró ningún usuario en la sesión.");
    }
  }

  /**
   * Método para rellenar el formulario con los datos del usuario.
   * @method
   * @param {any} respuesta - Respuesta con los datos del usuario.
   * @returns {void}
   */
  rellenarFormulario(respuesta: any) {
    this.perfilUser.setValue({
      nombre: respuesta.name,
      apellidos: respuesta.apellidos,
      user: respuesta.username,
      email: respuesta.email,
      edad: respuesta.edad,
      telefono: respuesta.telefono,
      actualPassword: '',
      password: '',
      confirmPassword: ''
    });
  }

  /**
   * Método para validar las contraseñas.
   * @method
   * @param {FormGroup} group - Grupo de formularios.
   * @returns {null | { passwValid: true }} - Null si las contraseñas coinciden, de lo contrario, un objeto con una propiedad de error.
   */
  checkPasswords(group: FormGroup) {
    let pass1 = group.get('actualPassword')?.value;
    let pass2 = group.get('password')?.value;
    let pass3 = group.get('confirmPassword')?.value;
    if (pass1 !== '' && pass1 !== undefined && pass1 !== null)
      return pass2 === pass3 ? null : { passwValid: true }
    else
      return null;
  }

  /**
   * Método para cerrar la sesión del usuario.
   * @method
   * @returns {void}
   */
  logOut() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userId');
    window.location.reload();
  }

  /**
   * Método para actualizar el perfil del usuario.
   * @method
   * @returns {void}
   */
  updateUserProfile(): void {
    const user: userProfile = {
      name: this.perfilUser.get("nombre")?.value,
      apellidos: this.perfilUser.get("apellidos")?.value,
      username: this.perfilUser.get("user")?.value,
      email: this.perfilUser.get("email")?.value,
      password: this.perfilUser.get("password")?.value,
      passwordActual: this.perfilUser.get("actualPassword")?.value,
      telefono: this.perfilUser.get("telefono")?.value,
      edad: this.perfilUser.get("edad")?.value
    }
    this.ouathService.updateUser(user).subscribe(
      respuesta => {
        this.modalService.openModalInfo("Usuario actualizado correctamente");
      }, err => {
        this.modalService.openModalError("HA habido un error actualizando al usuario");
      });
  }

  /**
   * Método para enviar el formulario.
   * @method
   * @returns {void}
   */
  onSubmit() {
    console.log(this.perfilUser.value);
    // Aquí puedes manejar la lógica de envío del formulario
  }

  /**
   * Método para cancelar el envío del formulario.
   * @method
   * @returns {void}
   */
  onCancel() {
    this.router.navigate(['/partidas']);
    this.perfilUser.reset();
    // Aquí puedes manejar la lógica de cancelación del formulario
  }

  /**
   * Método para alternar la visibilidad del campo de contraseña actual.
   * @method
   * @returns {void}
   */
  toggle() {
    this.hide = !this.hide;
  }

  /**
   * Método para alternar la visibilidad del campo de nueva contraseña.
   * @method
   * @returns {void}
   */
  toggle2() {
    this.hide2 = !this.hide2;
  }

  /**
   * Método para alternar la visibilidad del campo de confirmación de contraseña.
   * @method
   * @returns {void}
   */
  toggle3() {
    this.hide3 = !this.hide3;
  }
}
