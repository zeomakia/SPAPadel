import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  perfilUser!: any;
  constructor(private router:Router,private ouathService:OauthService, private modalService: ModalService){
    this.perfilUser = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      user: new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', Validators.required),
      actualPassword: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }
  ngOnInit() {
        this.obtenerDatosUsuario().subscribe(
            respuesta => {
                this.rellenarFormulario(respuesta);
                console.log("Usuario:"+ this.perfilUser);
                console.log("respuesta:"+ respuesta.data);
            },
            error => {
                console.error('Error al obtener el usuario:', error);
                this.modalService.openModalError("Ha ocurrido un error recuperando el usuario.")
                // Aquí puedes manejar el error según tus necesidades
            }
        );
   
}

  obtenerDatosUsuario(): Observable<any>{
    const user = sessionStorage.getItem('user')!;
    if (user!==null) {
      return this.ouathService.getUser(user);
    }else{
      this.modalService.openModalError("Ha ocurrido un error recuperando el usuario de la sesión.");
      return this.perfilUser;
  }
  }
  rellenarFormulario(respuesta: any){
    this.perfilUser.setValue({
      nombre: respuesta.name,
      apellidos: respuesta.apellidos,
      user: respuesta.username,
      email: respuesta.email,
      edad: respuesta.edad,
      telefono: respuesta.telefono,

    })
  }
  showChangePassword = false;

  onSubmit() {
    console.log(this.perfilUser.value);
    // Aquí puedes manejar la lógica de envío del formulario
  }

  onCancel() {
    this.router.navigate(['/jugadores']);
    this.perfilUser.reset();
    // Aquí puedes manejar la lógica de cancelación del formulario
  }
}