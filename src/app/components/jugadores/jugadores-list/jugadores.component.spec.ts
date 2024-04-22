import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadoresComponent } from './jugadores.component';
import { JugadorService } from '../../../services/jugador.service';
import { of, throwError } from 'rxjs';
import { Jugadores } from 'src/app/models/jugadores';
import { EstadisticasJugadores } from 'src/app/models/estadisticasJugadores';
import { NgxPaginationModule } from 'ngx-pagination';
import { BaseChartDirective } from 'ng2-charts/lib/base-chart.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JugadoresComponent', () => {
  let component: JugadoresComponent;
  let fixture: ComponentFixture<JugadoresComponent>;
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
const estadisticasJugador:EstadisticasJugadores = {
  partidasGanadas:[],
  partidasPerdidas:[],
  porcentajeVictorias:[],
  names:[],
  namesPorcentaje:[]
};
const jugadores: Jugadores[] = [jugador,jugador];
beforeEach(async () => {
  const jugadorSpy = jasmine.createSpyObj('JugadorService', ['getJugadores', 'getEstadisticasJugadores']);

  await TestBed.configureTestingModule({
    declarations: [JugadoresComponent],
    imports: [NgxPaginationModule], 
    providers: [
      { provide: JugadorService, useValue: jugadorSpy }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  .compileComponents();


    jugadorServiceSpy = TestBed.inject(JugadorService) as jasmine.SpyObj<JugadorService>;
    jugadorServiceSpy.getEstadisticasJugadores.and.returnValue(of(estadisticasJugador));
    jugadorServiceSpy.getJugadores.and.returnValue(of(jugadores));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load jugadores and estadisticas on init', () => {
    

    jugadorServiceSpy.getJugadores.and.returnValue(of(jugadores));
    jugadorServiceSpy.getEstadisticasJugadores.and.returnValue(of(estadisticasJugador));

    component.ngOnInit();

    expect(component.jugadores).toEqual(jugadores);
    expect(component.estadisticasJugadores).toEqual(estadisticasJugador);
  });

  it('should handle error when loading jugadores', () => {
    const error = false;
    jugadorServiceSpy.getJugadores.and.returnValue(throwError(error));

    component.ngOnInit();

    expect(component.jugadores).toBeDefined();
  });

  it('should handle error when loading estadisticas', () => {
    const error = false;
    jugadorServiceSpy.getEstadisticasJugadores.and.returnValue(throwError(error));

    component.ngOnInit();

  });

  // More tests for other methods can be added here
});
