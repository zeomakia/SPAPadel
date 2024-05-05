import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PartidaDetailComponent } from './partida-detail.component';
import { PartidaService } from '../../../services/partida.service';
import { UbicacionService } from '../../../services/ubicacion-service.service';
import { ParejaService } from '../../../services/pareja.service';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Partida } from '../../../models/partida';
import { Pareja } from '../../../models/pareja';
import { Ubicacion } from '../../../models/ubicacion';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
describe('PartidaDetailComponent', () => {
  let component: PartidaDetailComponent;
  let fixture: ComponentFixture<PartidaDetailComponent>;
  let partidaServiceSpy: jasmine.SpyObj<PartidaService>;
  let ubicacionServiceSpy: jasmine.SpyObj<UbicacionService>;
  let parejaServiceSpy: jasmine.SpyObj<ParejaService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  let formBuilder: FormBuilder;
  const partidaMock: Partida = { id: 1,
    pareja1: 'Pareja 1',
    pareja2: 'Pareja 2',
    ubicacion: 'Ubicación de la partida',
    dia: new Date('2024-04-13'), // Puedes ajustar la fecha según sea necesario
    resultado: '6-4 6-4 6-4',
    parejaGanadora: '1',
    parejaPerdedora: '2'};
  const parejaMock: Pareja[] = [ {  id: 1,
    jugador1: 1,
    jugador2: 2,
    p_jugadas: 10,
    p_ganadas: 5,
    p_perdidas: 5,
    nombre_jugador1: 'Jugador 1',
    nombre_jugador2: 'Jugador 2',
    nombrePareja: 'Pareja 1' }];
  const ubicacionesMock: Ubicacion[] = [{
    id: 1,
    name: 'Ubicacion 1',
    codigo_postal: '28001',
    direccion: 'Calle de ejemplo, 1'
  } ];
  const changes: SimpleChanges = {};

  beforeEach(async () => {
    const spyPartida = jasmine.createSpyObj('PartidaService', ['getPartida', 'updatePartida', 'addPartida']);
    const spyUbicacion = jasmine.createSpyObj('UbicacionService', ['getUbicaciones']);
    const spyPareja = jasmine.createSpyObj('ParejaService', ['getParejas']);
    const spyModal = jasmine.createSpyObj('ModalService', ['openModalError', 'openModalInfo']);

    await TestBed.configureTestingModule({
      declarations: [ PartidaDetailComponent ],
      imports: [ ReactiveFormsModule,SharedModule,CommonModule ],
      providers: [
        { provide: PartidaService, useValue: spyPartida },
        { provide: UbicacionService, useValue: spyUbicacion },
        { provide: ParejaService, useValue: spyPareja },
        { provide: ModalService, useValue: spyModal },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartidaDetailComponent);
    component = fixture.componentInstance;
    formBuilder = new FormBuilder();
    component.nuevaPartidaForm = formBuilder.group({
      pareja1Form: ['1'], 
      pareja2Form: ['2'], 
      ubicacionForm: ['1'], 
      resultadoForm: ['6-4 6-3 6-2'], 
      parejaGanadoraForm: ['1'], 
      diaForm: ['22-01-2020'], 
    });
    partidaServiceSpy = TestBed.inject(PartidaService) as jasmine.SpyObj<PartidaService>;
    ubicacionServiceSpy = TestBed.inject(UbicacionService) as jasmine.SpyObj<UbicacionService>;
    parejaServiceSpy = TestBed.inject(ParejaService) as jasmine.SpyObj<ParejaService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get partida on init', () => {
   
    component.parejas = parejaMock;
    component.ubicaciones = ubicacionesMock;
    component.partida=partidaMock;
    parejaServiceSpy.getParejas.and.returnValue(of(parejaMock));
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));
    component.identificador=0;
    component.ngOnInit();

    expect(parejaServiceSpy.getParejas).toHaveBeenCalled();
  });
  it('should get partida details on init', () => {
     // Crear un espía para partidaService.getPartida
     partidaServiceSpy.getPartida.and.returnValue(of(partidaMock));    
     component.identificador = 1;
     component.tipo = 'M';
    component.partida = partidaMock;
    component.parejas = parejaMock;
    parejaServiceSpy.getParejas.and.returnValue(of(parejaMock));
    partidaServiceSpy.getPartida.and.returnValue(of(partidaMock));
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));
    component.ngOnInit();
    
    // spyOn(parejaService, 'getParejas').and.returnValue(of(parejaMock));
    // (parejaService.getParejas as jasmine.Spy).and.returnValue(of(parejaMock));    component.ngOnInit();
    // expect(parejaService.getParejas).toHaveBeenCalled();
    expect(component.partida).toEqual(partidaMock);
  });

  it('should update partida', () => {
    component.identificador = 1;
    component.tipo = 'M';
     partidaServiceSpy.updatePartida.and.returnValue(of(partidaMock));
    // (partidaService.updatePartida as jasmine.Spy).and.returnValue(of(partidaMock));
    component.guardarNuevaPartida();
    expect(component.nuevaPartidaForm.valid).toBeTrue();
    expect(partidaServiceSpy.updatePartida).toHaveBeenCalled();
  });

  it('should add new partida', () => {
    component.identificador = 0;
   partidaServiceSpy.addPartida.and.returnValue(of(partidaMock));
    component.guardarNuevaPartida();
    expect(partidaServiceSpy.addPartida).toHaveBeenCalled();
  });
  it('should get partida onChanges', () => {
   
    component.parejas = parejaMock;
    component.ubicaciones = ubicacionesMock;
    component.partida=partidaMock;
    parejaServiceSpy.getParejas.and.returnValue(of(parejaMock));
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));
    component.identificador=0;
    component.ngOnChanges(changes);

    expect(parejaServiceSpy.getParejas).toHaveBeenCalled();
  });
  it('should get partida details onChanges', () => {
     // Crear un espía para partidaService.getPartida
     partidaServiceSpy.getPartida.and.returnValue(of(partidaMock));    
     component.identificador = 1;
     component.tipo = 'M';
    component.partida = partidaMock;
    component.parejas = parejaMock;
    parejaServiceSpy.getParejas.and.returnValue(of(parejaMock));
    partidaServiceSpy.getPartida.and.returnValue(of(partidaMock));
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));
    component.ngOnChanges(changes);
    
    // spyOn(parejaService, 'getParejas').and.returnValue(of(parejaMock));
    // (parejaService.getParejas as jasmine.Spy).and.returnValue(of(parejaMock));    component.ngOnInit();
    // expect(parejaService.getParejas).toHaveBeenCalled();
    expect(component.partida).toEqual(partidaMock);
  });

});