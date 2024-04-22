import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { DataSource } from '@angular/cdk/collections';
import { userProfile } from 'src/app/models/userProfile';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  registroForm!: FormGroup;
  edades: number[] = Array.from({length:100},(_, i )=>i+1);
  hide:boolean=true;
  hide2:boolean=true;

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

    checkEmail(group: FormGroup){
      let pass1= group.get('email')?.value;
      let pass2 = group.get('emailConfirm')?.value;
      return pass1===pass2 ? null: { notSameEmail: true}
    }
    checkPasswords(group: FormGroup){
      let pass1= group.get('contraseña')?.value;
      let pass2 = group.get('contraseñaConfirm')?.value;
      return pass1===pass2 ? null: { notSame: true}
    }
 

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
      this.oauthService.singUpComponent(request).pipe(
        catchError(error => {
          console.log(error);
          this.modalService.openModalError;
          return of(null);
        })
      ).subscribe((response: Boolean) => {
          if(response)
          {
            console.log("Usuari: " + this.registroForm.get("user")?.value + " creat correctament!");
            this.modalService.openModalInfo("Benvingut/da! " + this.registroForm.get("user")?.value);
            this.router.navigate(['/login']);
          }else{
            console.log("Error.");
            this.modalService.openModalError;
          }
        
      });
    
      
    }
    
   
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    // o realizar otras acciones necesarias
    console.log(this.registroForm.value);
  }
  login() {
    // redireccion desde boton cancelar al login
    console.log('Login User');
    this.router.navigate(['/login']);
  }
  toggle(){
    this.hide=!this.hide;
  }
  toggle2(){
    this.hide2=!this.hide2;
  }
}
