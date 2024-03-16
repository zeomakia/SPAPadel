import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrl: './perfil-user.component.scss'
})
export class PerfilUserComponent {
  perfilUser!: any;
  constructor(private router:Router,private ouathService:OauthService){
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

  ngOnInit(){
    this.ouathService.getUser("asd").subscribe(singUPRequest=>
      {
        this.perfilUser=singUPRequest;
    });
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