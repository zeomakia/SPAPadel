import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JugadoresDetailComponent } from './jugadores-detail.component';
import { JugadorService } from 'src/app/services/jugador.service';
import { of } from 'rxjs';
import { Jugadores } from 'src/app/models/jugadores';
import { EstadisticasParejasJugador } from 'src/app/models/estadisticasParejasJugador';

describe('JugadoresDetailComponent', () => {
  let component: JugadoresDetailComponent;
  let fixture: ComponentFixture<JugadoresDetailComponent>;
  let jugadorServiceSpy: jasmine.SpyObj<JugadorService>;
  const jugador: Jugadores = {
    id: 1,
    name: 'demo',
    apellidos: 'Apellido Demo',
    username: 'demo_username',
    edad: 25,
    partidasGanadas: 10,
    partidasPerdidas: 5,
    partidasJugadas: 15
};
  const estadisticasJugador:EstadisticasParejasJugador = {
    partidasGanadas:[],
    partidasPerdidas:[],
    porcentajeVictorias:[],
    names:[],
    namesPorcentaje:[]
  };

  beforeEach(async () => {
    const jugadorServiceSpyObj = jasmine.createSpyObj('JugadorService', ['getJugador','getEstadisticasParejasJugador']);
    await TestBed.configureTestingModule({
      declarations: [ JugadoresDetailComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
        { provide: JugadorService, useValue: jugadorServiceSpyObj }
      ]
    })
    .compileComponents();
 
    jugadorServiceSpy = TestBed.inject(JugadorService) as jasmine.SpyObj<JugadorService>;
    jugadorServiceSpy.getEstadisticasParejasJugador.and.returnValue(of(estadisticasJugador));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back',()=>{
    component.goBack();
  });

  it('should disable form fields when tipo is D', () => {
    component.jugador=jugador;
    component.tipo = 'D';
    component.jugadorForm.controls['jugadorIdForm'].setValue('1');
    component.jugadorForm.controls['nameForm'].setValue('John');
    component.jugadorForm.controls['apellidosForm'].setValue('Doe');
    component.jugadorForm.controls['usernameForm'].setValue('johndoe');
    component.jugadorForm.controls['edadForm'].setValue(25);

    component.rellenarForm();
 console.log('disabled?' +component.jugadorForm.controls['jugadorIdForm'].disabled);
    expect(component.jugadorForm.controls['jugadorIdForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['nameForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['apellidosForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['usernameForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['edadForm'].disabled).toBeTruthy();
  });

  it('should enable form fields when tipo is A', () => {
    component.tipo = 'A';
    component.jugador=jugador;
    component.rellenarForm();


    expect(component.jugadorForm.controls['nameForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['apellidosForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['usernameForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['edadForm'].enabled).toBeTruthy();
  });

  it('should  rellenar estadisticas works', () => {
    component.jugador=jugador;
    component.rellenarEstadisticas();

    expect(component.porcentaje!==0).toBeTruthy();
 
  });

  // Add more test cases as needed...
});
