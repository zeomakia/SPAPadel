import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JugadorService } from './jugador.service';
import { Jugadores } from 'src/app/models/jugadores';
import { EstadisticasJugadores } from '../models/estadisticasJugadores';
import { EstadisticasParejasJugador } from '../models/estadisticasParejasJugador';

export const mockEstadisticas: EstadisticasJugadores = {
  partidasGanadas: [10, 5, 8],
  partidasPerdidas: [3, 7, 2],
  porcentajeVictorias: [76, 42, 80],
  names: ['Jugador1', 'Jugador2', 'Jugador3'],
  namesPorcentaje: ['Jugador1 (76%)', 'Jugador2 (42%)', 'Jugador3 (80%)']
};
export const mockEstadisticasParejas: EstadisticasParejasJugador = {
  partidasGanadas: [10, 5, 8],
  partidasPerdidas: [3, 7, 2],
  porcentajeVictorias: [76, 42, 80],
  names: ['Jugador1', 'Jugador2', 'Jugador3'],
  namesPorcentaje: ['Jugador1 (76%)', 'Jugador2 (42%)', 'Jugador3 (80%)']
};
describe('JugadorService', () => {
  let service: JugadorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JugadorService]
    });
    service = TestBed.inject(JugadorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return jugadores', () => {
    const mockJugadores: Jugadores[] = [
      // Define tus datos de jugadores simulados aquí
    ];

    service.getJugadores().subscribe(jugadores => {
      expect(jugadores).toEqual(mockJugadores);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/jugador/findAll');
    expect(req.request.method).toBe('GET');
    req.flush(mockJugadores);
  });

  it('should return estadisticas jugadores', () => {
    service.getEstadisticasJugadores().subscribe(estadisticas => {
      expect(estadisticas).toEqual(mockEstadisticas);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/jugador/estadisticas');
    expect(req.request.method).toBe('GET');
    req.flush(mockEstadisticas);
  });

  it('should return estadisticas parejas jugador', () => {
    const jugadorId = 1;
    

    service.getEstadisticasParejasJugador(jugadorId).subscribe(estadisticas => {
      expect(estadisticas).toEqual(mockEstadisticasParejas);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/jugador/estadisticas/${jugadorId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEstadisticasParejas);
  });
});
