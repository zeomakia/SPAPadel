// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { PartidasComponent } from './partidas.component';
// import { PartidaService } from '../../../services/partida.service';
// import { ModalService } from 'src/app/services/modal.service';
// import { ChangeDetectorRef } from '@angular/core';

// describe('PartidasComponent', () => {
//   let component: PartidasComponent;
//   let fixture: ComponentFixture<PartidasComponent>;
//   let partidaService: PartidaService;
//   let modalService: ModalService;

//   beforeEach(async () => {
//     const partidaServiceSpy = jasmine.createSpyObj('PartidaService', ['getPartidas', 'deletePartida']);
//     const modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModalInfo']);

//     await TestBed.configureTestingModule({
//       declarations: [ PartidasComponent ],
//       providers: [
//         { provide: PartidaService, useValue: partidaServiceSpy },
//         { provide: ModalService, useValue: modalServiceSpy },
//         ChangeDetectorRef
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(PartidasComponent);
//     component = fixture.componentInstance;
//     partidaService = TestBed.inject(PartidaService);
//     modalService = TestBed.inject(ModalService);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getPartidas on ngOnInit', () => {
//     partidaService.getPartidas.and.returnValue(of([]));
//     component.ngOnInit();
//     expect(partidaService.getPartidas).toHaveBeenCalled();
//   });

//   it('should set partidas on getPartidas', () => {
//     const partidas = [/* tus partidas aquí */];
//     partidaService.getPartidas.and.returnValue(of(partidas));
//     component.getPartidas();
//     expect(component.partidas).toEqual(partidas);
//   });

//   it('should set detalle to true on goDetail', () => {
//     component.goDetail(1, 'A');
//     expect(component.detalle).toBeTrue();
//   });

//   it('should call goDetail with 0 and "A" on createMatch', () => {
//     spyOn(component, 'goDetail');
//     component.createMatch();
//     expect(component.goDetail).toHaveBeenCalledWith(0, 'A');
//   });

//   it('should set detalle to false on cerrarHijo', () => {
//     component.cerrarHijo();
//     expect(component.detalle).toBeFalse();
//   });

//   it('should call deletePartida and getPartidas on eliminarPartida', () => {
//     partidaService.deletePartida.and.returnValue(of(true));
//     partidaService.getPartidas.and.returnValue(of([]));
//     component.eliminarPartida(1);
//     expect(partidaService.deletePartida).toHaveBeenCalledWith(1);
//     expect(partidaService.getPartidas).toHaveBeenCalled();
//   });
// });