import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UbicacionComponent } from './ubicacion.component';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { ModalService } from 'src/app/services/modal.service';
import { of, throwError } from 'rxjs';
import { Ubicacion } from 'src/app/models/ubicacion';
import { HttpResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

describe('UbicacionComponent', () => {
  let component: UbicacionComponent;
  let fixture: ComponentFixture<UbicacionComponent>;
  let ubicacionServiceSpy: jasmine.SpyObj<UbicacionService>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;
  const ubicacionesMock: Ubicacion[] = [
    { id: 1, name: 'Ubicacion 1', codigo_postal: '12345', direccion: 'Dirección 1' },
    { id: 2, name: 'Ubicacion 2', codigo_postal: '67890', direccion: 'Dirección 2' }
  ];
  beforeEach(async () => {
    const spyUbicacionService = jasmine.createSpyObj('UbicacionService', ['getUbicaciones', 'deleteUbicacion']);
    const spyModalService = jasmine.createSpyObj('ModalService', ['openModalError', 'openModalInfo']);

    await TestBed.configureTestingModule({
      declarations: [ UbicacionComponent ],
      imports: [NgxPaginationModule],
      providers: [
        { provide: UbicacionService, useValue: spyUbicacionService },
        { provide: ModalService, useValue: spyModalService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionComponent);
    component = fixture.componentInstance;
    ubicacionServiceSpy = TestBed.inject(UbicacionService) as jasmine.SpyObj<UbicacionService>;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ubicaciones on init', () => {
   
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));
    component.ngOnInit();
    expect(component.ubicaciones).toEqual(ubicacionesMock);
  });

  it('should handle error on get ubicaciones', () => {
    ubicacionServiceSpy.getUbicaciones.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(modalServiceSpy.openModalError).toHaveBeenCalledWith('Error recuperando ubicacionesError');
  });
  it('go detail', () => {
    
    component.ubicaciones=ubicacionesMock;
    component.goDetail(1,"");
    expect(component.ubicacion?.id).toEqual(1);
  });
  it('go Borrar', () => {
    
    component.ubicaciones=ubicacionesMock;
    const responseMock = new HttpResponse({ body: { message: 'Ubicacion borrada correctamente.' } });
    ubicacionServiceSpy.deleteUbicacion.and.returnValue(of(responseMock));
    ubicacionServiceSpy.getUbicaciones.and.returnValue(of(ubicacionesMock));

    component.goBorrar(1);
    expect(ubicacionServiceSpy.getUbicaciones).toHaveBeenCalled();
  });

  it('create ubicacion', () => {
    component.createUbicacion();
  });
  it('cerrar hijo', () => {
    component.cerrarHijo();
  });
  // Aquí puedes agregar más pruebas para los otros métodos del componente
});