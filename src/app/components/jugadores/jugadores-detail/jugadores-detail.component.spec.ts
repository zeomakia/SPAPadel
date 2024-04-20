import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JugadoresDetailComponent } from './jugadores-detail.component';
import { JugadorService } from 'src/app/services/jugador.service';
import { of } from 'rxjs';
import { Jugadores } from 'src/app/models/jugadores';

describe('JugadoresDetailComponent', () => {
  let component: JugadoresDetailComponent;
  let fixture: ComponentFixture<JugadoresDetailComponent>;
  let jugadorServiceSpy: jasmine.SpyObj<JugadorService>;

  beforeEach(async () => {
    const jugadorServiceSpyObj = jasmine.createSpyObj('JugadorService', ['getJugador']);
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

  fit('should disable form fields when tipo is D', () => {
    
    component.tipo = 'D';
    component.jugadorForm.controls['jugadorIdForm'].setValue('1');
    component.jugadorForm.controls['nameForm'].setValue('John');
    component.jugadorForm.controls['apellidosForm'].setValue('Doe');
    component.jugadorForm.controls['usernameForm'].setValue('johndoe');
    component.jugadorForm.controls['edadForm'].setValue(25);

    component.rellenarForm();

    expect(component.jugadorForm.controls['jugadorIdForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['nameForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['apellidosForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['usernameForm'].disabled).toBeTruthy();
    expect(component.jugadorForm.controls['edadForm'].disabled).toBeTruthy();
  });

  it('should enable form fields when tipo is A', () => {
    component.tipo = 'A';

    component.rellenarForm();

    expect(component.jugadorForm.controls['jugadorIdForm'].disabled).toBeTruthy(); // Assuming jugadorIdForm should always be disabled
    expect(component.jugadorForm.controls['nameForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['apellidosForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['usernameForm'].enabled).toBeTruthy();
    expect(component.jugadorForm.controls['edadForm'].enabled).toBeTruthy();
  });

  // Add more test cases as needed...
});
