import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { userProfile } from 'src/app/models/userProfile';
import { ModalService } from 'src/app/services/modal.service';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  perfilUser!: FormGroup;
  showChangePassword = false;
  mostrarDatos=false;
  hide:boolean=true;
  hide2:boolean=true;
  hide3:boolean=true;
  constructor(private formBuilder: FormBuilder,private router:Router,private ouathService:OauthService, private modalService: ModalService)
  {
    this.perfilUser =  this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      user: new FormControl({value: '', disabled: true}, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl('', [Validators.required]),
      telefono: new FormControl('', Validators.required),
      actualPassword: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    },{ validator: this.checkPasswords});
  }
  ngOnInit() {
        this.obtenerDatosUsuario().subscribe(
            respuesta => {
                this.rellenarFormulario(respuesta);
                console.log("Usuario:"+ this.perfilUser);
                console.log("respuesta:"+ respuesta.data);
                this.mostrarDatos=true;
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
      return throwError("No se encontró ningún usuario en la sesión.");    }
  }
  rellenarFormulario(respuesta: any){
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
  checkPasswords(group: FormGroup){
    let pass1= group.get('actualPassword')?.value;
    let pass2 = group.get('password')?.value;
    let pass3 = group.get('confirmPassword')?.value;
    if(pass1!=='' && pass1!==undefined && pass1!==null)
      return pass2===pass3 ? null: { passwValid: true}
    else 
      return null;
  }

  updateUserProfile():void{
      const user : userProfile={
       name:this.perfilUser.get("nombre")?.value,
       apellidos:this.perfilUser.get("apellidos")?.value,
       username:this.perfilUser.get("user")?.value,
       email:this.perfilUser.get("email")?.value,
       password:this.perfilUser.get("password")?.value,
       passwordActual:this.perfilUser.get("actualPassword")?.value,
       telefono:this.perfilUser.get("telefono")?.value,
       edad:this.perfilUser.get("edad")?.value
       }
    this.ouathService.updateUser(user).subscribe(
      respuesta=>{
        this.modalService.openModalInfo("Usuario actualizado correctamente");
      },err=>{
        this.modalService.openModalError("HA habido un error actualizando al usuario");
    });
  }
  

  onSubmit() {
    console.log(this.perfilUser.value);
    // Aquí puedes manejar la lógica de envío del formulario
  }

  onCancel() {
    this.router.navigate(['/partidas']);
    this.perfilUser.reset();
    // Aquí puedes manejar la lógica de cancelación del formulario
  }

  toggle(){
    this.hide=!this.hide;
  }
  toggle2(){
    this.hide2=!this.hide2;
  }
  toggle3(){
    this.hide3=!this.hide3;
  }
}