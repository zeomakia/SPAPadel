import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OauthService } from '../../../services/oauth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { DataSource } from '@angular/cdk/collections';
import { singUPRequest } from 'src/app/models/singUPRequest';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private oauthService: OauthService,private router: Router,
              private modalService: ModalService) { 
                this.registroForm = this.formBuilder.group({
                  nombre: ['', Validators.required],
                  user: ['', Validators.required],
                  apellidos: ['', Validators.required],
                  email: ['', [Validators.required, Validators.email]],
                  emailConfirm: ['', [Validators.required, Validators.email]],
                  telefono: ['', Validators.required]
                });
    }

 

  onSubmit(): void {
    if(this.registroForm.valid){
     const request : singUPRequest={
      name:this.registroForm.get("nombre")?.value,
      apellidos:this.registroForm.get("apellidos")?.value,
      username:this.registroForm.get("user")?.value,
      email:this.registroForm.get("email")?.value,
      password:"pepita2222",//this.registroForm.get("contraseña")?.value,
      telefono:this.registroForm.get("telefono")?.value
      }
      this.oauthService.singUpComponent(request).pipe(
        catchError(error => {
          console.log(error);
          this.modalService.openModalError;
          return of(null);
        })
      ).subscribe(response => {
          // Guarda el token en el almacenamiento local
          console.log(response);
        
      });
    
      this.router.navigate(['/login']);
    }
    
   
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    // o realizar otras acciones necesarias
    console.log(this.registroForm.value);
  }
  
}
