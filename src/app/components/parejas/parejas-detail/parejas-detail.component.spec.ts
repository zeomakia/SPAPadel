import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParejasDetailComponent } from './parejas-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';
import { JugadorService } from 'src/app/services/jugador.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { ModalService } from 'src/app/services/modal.service';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ParejasDetailComponent', () => {
  let component: ParejasDetailComponent;
  let fixture: ComponentFixture<ParejasDetailComponent>;
  let mockActivatedRoute: any;
  let mockJugadorService: any;
  let mockParejaService: any;
  let mockModalService: any;
  let mockLocation: any;
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
  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        params: {
          identificador: 1
        }
      }
    };
    mockJugadorService = jasmine.createSpyObj(['getJugadores']);
    mockParejaService = jasmine.createSpyObj(['getParejas', 'updatePareja', 'addPareja']);
    mockParejaService.getParejas.and.returnValue(of([{ id: 1, jugador1: 'Jugador1', jugador2: 'Jugador2' }]));
    mockModalService = jasmine.createSpyObj(['openModalInfo', 'openModalError']);
    mockLocation = jasmine.createSpyObj(['back']);

    await TestBed.configureTestingModule({
      declarations: [ParejasDetailComponent],
      imports: [ReactiveFormsModule,
        FormsModule, // Importamos FormsModule
        ReactiveFormsModule, // Importamos ReactiveFormsModule
        HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: JugadorService, useValue: mockJugadorService },
        { provide: ParejaService, useValue: mockParejaService },
        { provide: ModalService, useValue: mockModalService },
        { provide: Location, useValue: mockLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParejasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize with correct values when identificador is not 0', () => {
    mockActivatedRoute.snapshot.params.identificador = 1;
    mockParejaService.getParejas.and.returnValue(of([{ id: 1, jugador1: 'Jugador1', jugador2: 'Jugador2', nombre:'Jugador1' }]));
    component.ngOnInit();
    component.pareja=parejaTest;
    component.parejaForm.controls['jugador1Form'].setValue('1');
    component.parejaForm.controls['jugador1Form'].setValue('2');
    expect(component.isParejaNueva).toBeFalse();
    expect(component.parejas.length).toBe(1);
    expect(component.parejas[0].id).toBe(1);
  });

  fit('should initialize with correct values when identificador is 0', () => {
    mockActivatedRoute.snapshot.params.identificador = 1;
    mockJugadorService.getJugadores.and.returnValue(of([{ id: 1, name: 'Jugador1' }, { id: 2, name: 'Jugador2' }]));
    component.pareja=parejaTest;
    component.ngOnInit();
    expect(component.isParejaNueva).toBeFalse();

  });


  it('should call getParejas when ngOnChanges is called', () => {
    mockParejaService.getParejas.and.returnValue(of([{ id: 1, name: 'Jugador1', jugador2: 'Jugador2' }]));
    component.ngOnChanges({ identificador: {
      currentValue: 1,
      previousValue: undefined,
      firstChange: false,
      isFirstChange: function (): boolean {
        throw new Error('Function not implemented.');
      }
    } });
    expect(component.parejas.length).toBe(1);
    expect(component.parejas[0].id).toBe(1);
  });

  it('should call goBack when save is called', () => {
    const mockPareja: Pareja = { id: 1, jugador1: 1, nombrePareja: 'Jugador2', p_ganadas: 1, p_jugadas: 2, p_perdidas: 1 };
    component.pareja = mockPareja;
    component.save();
    expect(mockParejaService.updatePareja).toHaveBeenCalledWith(mockPareja);
    expect(mockModalService.openModalInfo).toHaveBeenCalledWith('Pareja actualizada correctamente');
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should call addPareja when guardarNuevaPareja is called', () => {
    const mockFormValue = { jugador1Form: 'Jugador1', jugador2Form: 'Jugador2' };
    component.nuevaParejaForm.setValue(mockFormValue);
    component.guardarNuevaPareja();
    expect(mockParejaService.addPareja).toHaveBeenCalled();
    expect(mockModalService.openModalInfo).toHaveBeenCalledWith('Pareja creada correctamente');
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should call rellenarEstadisticas when rellenarForm is called with tipo as "D"', () => {
    component.tipo = 'D';
    component.pareja = { id: 1, jugador1: 1, jugador2: 2, p_ganadas: 1, p_jugadas: 2, p_perdidas: 1 };
    spyOn(component, 'rellenarEstadisticas');
    component.rellenarForm();
    expect(component.rellenarEstadisticas).toHaveBeenCalled();
  });

  it('should call habilitarForm when rellenarForm is called with tipo not as "A"', () => {
    component.tipo = 'D';
    spyOn(component, 'habilitarForm');
    component.rellenarForm();
    expect(component.habilitarForm).toHaveBeenCalled();
  });
});
