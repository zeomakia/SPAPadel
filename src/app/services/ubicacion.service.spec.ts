import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UbicacionService } from './ubicacion-service.service';
import { Ubicacion } from '../models/ubicacion';

describe('UbicacionService', () => {
  let service: UbicacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UbicacionService]
    });
    service = TestBed.inject(UbicacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes al final de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve ubicaciones from the API via GET', () => {
    const dummyUbicaciones: Ubicacion[] = [
      { id: 1, name: 'Ubicacion 1' ,codigo_postal: '08951',direccion: 'asdasd'},
      { id: 2, name: 'Ubicacion 2' ,codigo_postal: '08951',direccion: 'asdasd'}
    ];

    service.getUbicaciones().subscribe(ubicaciones => {
      expect(ubicaciones.length).toBe(2);
      expect(ubicaciones).toEqual(dummyUbicaciones);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/ubicacion/findAll');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUbicaciones);
  });

  it('should add a ubicacion via POST', () => {
    const newUbicacion: Ubicacion = { id: 3, name: 'Nueva Ubicacion',codigo_postal: '08951',direccion: 'asdasd' };

    service.addUbicacion(newUbicacion).subscribe(response => {
      expect(response).toEqual(newUbicacion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/ubicacion/insert');
    expect(req.request.method).toBe('POST');
    req.flush(newUbicacion);
  });

  it('should modify a ubicacion via PUT', () => {
    const updatedUbicacion: Ubicacion = { id: 1, name: 'Ubicacion Modificada',codigo_postal: '08951',direccion: 'asdasd' };

    service.modifyUbicacion(updatedUbicacion).subscribe(response => {
      expect(response).toEqual(updatedUbicacion);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/ubicacion/update/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUbicacion);
  });

  it('should delete a ubicacion via DELETE', () => {
    const ubicacionId = 1;

    service.deleteUbicacion(ubicacionId).subscribe(response => {
      expect(response).toBeNull(); // La respuesta de una solicitud DELETE generalmente es undefined
    });

    const req = httpMock.expectOne('http://localhost:8080/api/ubicacion/delete/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // No hay contenido en la respuesta de la solicitud DELETE
  });

  // Agrega más pruebas según sea necesario para cubrir todas las operaciones del servicio
});
