import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParejasDetailComponent } from './parejas-detail.component';
import { JugadorService } from 'src/app/services/jugador.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { of } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';
import { Jugadores } from 'src/app/models/jugadores';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { SimpleChanges } from '@angular/core';

describe('ParejasDetailComponent', () => {
  let component: ParejasDetailComponent;
  let fixture: ComponentFixture<ParejasDetailComponent>;
  let mockJugadorService:any;
  let mockParejaService:any;
  let formBuilder: FormBuilder;
  let parejaTest:Pareja={
    id: 1,
    jugador1: 1,
    jugador2: 2,
    p_jugadas: 3,
    p_ganadas: 4,
    p_perdidas: 5,
    nombre_jugador1: 'Alex',
    nombre_jugador2: 'Test',
    nombrePareja: 'alex-test',

  }

  beforeEach(() => {
    mockJugadorService = jasmine.createSpyObj(['getJugadores']);
    mockParejaService = jasmine.createSpyObj(['getParejas', 'updatePareja', 'addPareja']);

    TestBed.configureTestingModule({
      imports:  [HttpClientTestingModule],
      declarations: [ ParejasDetailComponent ],
      providers: [
        { provide: JugadorService, useValue: mockJugadorService },
        { provide: ParejaService, useValue: mockParejaService },
        { provide : ActivatedRoute, useValue: { snapshot: { params: { } } } } // Proporciona un valor ficticio para ActivatedRoute}
      ]
    });

    formBuilder = new FormBuilder();
    fixture = TestBed.createComponent(ParejasDetailComponent);
    component = fixture.componentInstance;
    component.pareja = parejaTest;
    component.parejaForm = formBuilder.group({
      parejaIdForm: ['1'], // Proporciona un valor inicial para parejaIdForm
      p_ganadasForm: ['2'], // Proporciona un valor inicial para p_ganadasForm
      parejaOptionForm: ['1'], // Proporciona un valor inicial para parejaOptionForm
      p_jugadasForm: ['3'], // Proporciona un valor inicial para p_jugadasForm
      p_perdidasForm: ['1'], // Proporciona un valor inicial para p_perdidasForm
      // Inicializa otros controles de formulario aquí
    });
    component.nuevaParejaForm = formBuilder.group({
      jugador1Form: ['1'], // Proporciona un valor inicial para parejaIdForm
      Jugador2Form: ['2'], // Proporciona un valor inicial para p_ganadasForm
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get players on init when identifier is 0', () => {
    component.identificador = 0;
    mockJugadorService.getJugadores.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockJugadorService.getJugadores).toHaveBeenCalled();
  });

  it('should get pairs on init when identifier is not 0', () => {
    component.identificador = 1;
    mockParejaService.getParejas.and.returnValue(of([parejaTest])); 
    component.ngOnInit();
    expect(mockParejaService.getParejas).toHaveBeenCalled();
  });
  it('should get pairs on init when identifier is not 0', () => {
    component.identificador = 1;
    const changes: SimpleChanges = {};

    
    mockParejaService.getParejas.and.returnValue(of([parejaTest])); 
    component.ngOnChanges(changes);
    expect(mockParejaService.getParejas).toHaveBeenCalled();
  });
  it('should get pairs on init when identifier is  0', () => {
    component.identificador = 0;
    const changes: SimpleChanges = {};

    mockParejaService.getParejas.and.returnValue(of([parejaTest])); 
    component.ngOnChanges(changes);
    expect(mockParejaService.getParejas).toHaveBeenCalled();
  });
  it('should fill statistics correctly', () => {
    component.pareja = { p_ganadas: 2, p_perdidas: 1, p_jugadas: 3 } as Pareja;
    component.rellenarEstadisticas();
    expect(component.porcentaje).toBe(67);
    expect(component.doughnutChartDatasets).toEqual([{ data: [2, 1] }]);
  });

  it('Should go back', () => {
    component.goBack();
    expect(component).toBeTruthy();
  });
  it('Should update pareja', () => {
    mockParejaService.updatePareja.and.returnValue(of(parejaTest));
    component.save();
    expect(mockParejaService.updatePareja).toHaveBeenCalled();
  });
  it('should deshabilitar Form', ()=>{
    component.deshabilitarForm();
    expect(component.parejaForm.get('parejaIdForm')?.disabled).toBeTrue();
  })
  it('should guardar Pareja', ()=>{
    mockParejaService.addPareja.and.returnValue(of(parejaTest));
    component.guardarNuevaPareja();
    expect(mockParejaService.addPareja).toHaveBeenCalled();
  });
});
	
