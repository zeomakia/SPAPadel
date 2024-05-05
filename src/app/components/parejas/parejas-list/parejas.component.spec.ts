import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParejasComponent } from './parejas.component';
import { ParejaService } from 'src/app/services/pareja.service';
import { ModalService } from 'src/app/services/modal.service';
import { of, throwError } from 'rxjs';
import { Pareja } from 'src/app/models/pareja';
import { EstadisticasParejasJugador } from 'src/app/models/estadisticasParejasJugador';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ParejasComponent', () => {
  let component: ParejasComponent;
  let fixture: ComponentFixture<ParejasComponent>;
  let parejaService: jasmine.SpyObj<ParejaService>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const parejaServiceSpy = jasmine.createSpyObj('ParejaService', ['getParejas', 'deletePareja', 'getEstadisticasParejas']);
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['openModalError', 'openModalInfo']);

    await TestBed.configureTestingModule({
      declarations: [ ParejasComponent ],
      providers: [
        { provide: ParejaService, useValue: parejaServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy }
      ],
      imports: [NgxPaginationModule]
    })
    .compileComponents();

    parejaService = TestBed.inject(ParejaService) as jasmine.SpyObj<ParejaService>;
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParejasComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getParejas and getEstadisticasParejas on ngOnInit', () => {
   
    const estadisticasMock: EstadisticasParejasJugador = {
      partidasGanadas: [10, 20, 30],
      partidasPerdidas: [5, 10, 15],
      porcentajeVictorias: [66.67, 66.67, 66.67],
      names: ['Pareja 1', 'Pareja 2', 'Pareja 3'],
      namesPorcentaje: ['Pareja 1', 'Pareja 2', 'Pareja 3']
    };
    parejaService.getEstadisticasParejas.and.returnValue(of(estadisticasMock));
    parejaService.getParejas.and.returnValue(of([]));

    component.ngOnInit();

    expect(parejaService.getEstadisticasParejas).toHaveBeenCalled();
    expect(parejaService.getParejas).toHaveBeenCalled();
  });

  it('should set parejas on getParejas success', () => {
    const parejasMock: Pareja[] = [
      // rellena con datos de prueba
    ];
    parejaService.getParejas.and.returnValue(of(parejasMock));

    component.getParejas();

    expect(component.parejas).toEqual(parejasMock);
  });

  it('should call openModalError on getParejas error', () => {
    const error = { error: { message: "error" } };
    parejaService.getParejas.and.returnValue(throwError(error));

    component.getParejas();

    expect(modalService.openModalError).toHaveBeenCalled();
  });

  it('should set detalle to true on goDetail', () => {
    component.goDetail(1, 'A');

    expect(component.detalle).toBeTrue();
  });

  it('should call goDetail with 0 and "A" on createMatch', () => {
    spyOn(component, 'goDetail');

    component.createMatch();

    expect(component.goDetail).toHaveBeenCalledWith(0, 'A');
  });

  it('should call openModalInfo on eliminarPareja success', () => {
    parejaService.deletePareja.and.returnValue(of(true));

    component.eliminarPareja(1);

    expect(modalService.openModalInfo).toHaveBeenCalled();
  });

  it('should toggle isFirstChartVisible on toggleCharts', () => {
    const initialIsFirstChartVisible = component.isFirstChartVisible;

    component.toggleCharts();

    expect(component.isFirstChartVisible).toBe(!initialIsFirstChartVisible);
  });
});
	
