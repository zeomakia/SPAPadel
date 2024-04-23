import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasComponent } from './partidas.component';
import { PartidaService } from '../../../services/partida.service';
import { ModalService } from 'src/app/services/modal.service';
import { ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importamos FormsModule y ReactiveFormsModule
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Partida } from 'src/app/models/partida';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
describe('PartidasComponent', () => {
  let component: PartidasComponent;
  let fixture: ComponentFixture<PartidasComponent>;
  let partidaServiceSpy: jasmine.SpyObj<PartidaService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  const dummyPartidas: Partida[] = [{
    id: 1,
    pareja1: 'Pareja 1',
    pareja2: 'Pareja 2',
    ubicacion: 'Ubicación de la partida',
    dia: new Date('2024-04-13'), // Puedes ajustar la fecha según sea necesario
    resultado: 'Resultado de la partida',
    parejaGanadora: 'Pareja ganadora',
    parejaPerdedora: 'Pareja perdedora'
  },{
    id: 2,
    pareja1: 'Pareja 1',
    pareja2: 'Pareja 2',
    ubicacion: 'Ubicación de la partida',
    dia: new Date('2024-04-13'), // Puedes ajustar la fecha según sea necesario
    resultado: 'Resultado de la partida',
    parejaGanadora: 'Pareja ganadora',
    parejaPerdedora: 'Pareja perdedora'
  }]
  beforeEach(async () => {
    const partidaServiceSpyObj = jasmine.createSpyObj('PartidaService', ['getPartidas', 'deletePartida']);
    const modalServiceSpyObj = jasmine.createSpyObj('ModalService', ['openModalInfo']);

    await TestBed.configureTestingModule({
      declarations: [PartidasComponent],
      imports: [
        FormsModule, // Importamos FormsModule
        ReactiveFormsModule, // Importamos ReactiveFormsModule
        NgxPaginationModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        SharedModule,
      ],
      providers: [
        { provide: PartidaService, useValue: partidaServiceSpyObj },
        { provide: ModalService, useValue: modalServiceSpyObj }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidasComponent);
    component = fixture.componentInstance;
    partidaServiceSpy = TestBed.inject(PartidaService) as jasmine.SpyObj<PartidaService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch partidas on ngOnInit', () => {

    partidaServiceSpy.getPartidas.and.returnValue(of(dummyPartidas));

    component.ngOnInit();

    expect(partidaServiceSpy.getPartidas).toHaveBeenCalled();
    expect(component.partidas).toEqual(dummyPartidas);
  });


  it('should call createMatch and set detalle to true with correct parameters', () => {
    spyOn(component, 'goDetail');

    component.createMatch();

    expect(component.goDetail).toHaveBeenCalledWith(0, 'A');
  });

  it('should call cerrarHijo and set detalle to false', () => {
    component.detalle = true;

    component.cerrarHijo();

    expect(component.detalle).toBeFalse();
  });

  it('should call deletePartida and update partidas on eliminarPartida', () => {
    const id = 1;
    partidaServiceSpy.deletePartida.and.returnValue(of(true));
    partidaServiceSpy.getPartidas.and.returnValue(of(dummyPartidas));

    component.eliminarPartida(id);

    expect(partidaServiceSpy.deletePartida).toHaveBeenCalledWith(id);
    expect(modalServiceSpy.openModalInfo).toHaveBeenCalledWith("Registro eliminado correctamente");
    expect(partidaServiceSpy.getPartidas).toHaveBeenCalled();
  });
});