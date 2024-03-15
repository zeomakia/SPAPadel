import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  registroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      user: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    // o realizar otras acciones necesarias
    console.log(this.registroForm.value);
  }
}
