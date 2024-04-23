import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Jugadores } from 'src/app/models/jugadores';
import { Pareja } from 'src/app/models/pareja';
import { JugadorService } from 'src/app/services/jugador.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { PartidaService } from 'src/app/services/partida.service';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { Location } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-parejas-detail',
  templateUrl: './parejas-detail.component.html',
  styleUrls: ['./parejas-detail.component.scss'],
})
export class ParejasDetailComponent implements OnInit {
  nuevaParejaForm: FormGroup;
  parejaForm: FormGroup;
  @Input() identificador!: number;
  @Input() tipo?: string;
  @Input() pareja?: Pareja;
  @Output() cerrarDetalle = new EventEmitter<void>();
  @Output() actualizar = new EventEmitter<void>();
  parejas: Pareja[] = [];
  jugadores: Jugadores[] = [];
  disable: boolean = true;
  isParejaNueva: boolean = false;
  doughnutChartLabels: string[] = [];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [];
  porcentaje: number = 0;
  constructor(
    private route: ActivatedRoute,
    private partidaService: PartidaService,
    private ubicacionService: UbicacionService,
    private parejaService: ParejaService,
    private jugadorService: JugadorService,
    private location: Location,
    private readonly cd: ChangeDetectorRef,
    private modalService: ModalService
  ) {
    this.parejaForm = new FormGroup({
      parejaIdForm: new FormControl('', Validators.required),
      parejaOptionForm: new FormControl('', Validators.required),
      p_ganadasForm: new FormControl('', Validators.required),
      p_jugadasForm: new FormControl('', Validators.required),
      p_perdidasForm: new FormControl('', Validators.required),
    });
    this.nuevaParejaForm = new FormGroup({
      jugador1Form: new FormControl('', Validators.required),
      jugador2Form: new FormControl('', Validators.required),
    });
  }
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  ngOnInit(): void {
    (window as any)['ParejasDetailComponent'] = this;
    console.log('Pareja init ' + JSON.stringify(this.pareja));
    if (this.identificador == 0) {
      this.isParejaNueva = true;
      this.getJugadores();
    } else {
      this.getParejas().subscribe((parejas) => {
        this.parejas = parejas;
        this.rellenarForm();
      });
      console.log('Pareja' + JSON.stringify(this.pareja));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    (window as any)['ParejasDetailComponent'] = this;
    console.log('Pareja change' + JSON.stringify(this.pareja));
    if (this.identificador == 0) {
      this.isParejaNueva = true;
      this.getParejas().subscribe((parejas) => (this.parejas = parejas));
      console.log('Lista parejas' + this.parejas);
    } else {
      this.isParejaNueva = false;
      this.getParejas().subscribe((parejas) => {
        this.parejas = parejas;
        this.rellenarForm();
      });
    }
  }
  rellenarEstadisticas() {
    let ganadas: number = this.pareja?.p_ganadas || 0;
    let perdidas: number = this.pareja?.p_perdidas || 0;
    let jugadas: number = this.pareja?.p_jugadas || 1;
    this.porcentaje = (ganadas / jugadas) * 100;
    // Redondea el porcentaje a dos decimales
    this.porcentaje = parseFloat(this.porcentaje.toFixed(0));
    this.doughnutChartLabels = ['Partidas Ganadas', 'Partidas Perdidas'];
    this.doughnutChartDatasets = [{ data: [ganadas, perdidas] }];
  }

  getJugadores(): void {
    this.jugadorService
      .getJugadores()
      .subscribe((jugadores) => (this.jugadores = jugadores));
    console.log('Lista jugadores' + this.jugadores);
  }

  getParejas(): Observable<Pareja[]> {
    return this.parejaService.getParejas();
  }

  goBack(): void {
    this.actualizar.emit();
    this.cerrarDetalle.emit();
  }

  save(): void {
    this.parejaService.updatePareja(this.pareja!).subscribe(
      () => {
        this.modalService.openModalInfo('Pareja actualizada correctamente');
        this.goBack();
      },
      (error) => {
        console.error('Error al modificar la pareja: ', error.error.message);
        this.modalService.openModalError(
          'Error al modificar la pareja: ' + error.error.message
        );
      }
    );
  }
  guardarNuevaPareja() {
    if (this.nuevaParejaForm.valid) {
      // Crear una nueva instancia de PAreja
      const nuevaPareja: Pareja = {
        id: 0, // O el valor por defecto que desees para el nuevo id
        jugador1: this.nuevaParejaForm.get('jugador1Form')?.value,
        jugador2: this.nuevaParejaForm.get('jugador2Form')?.value,
      };

      // Llamar al servicio con la nueva partida
      this.parejaService.addPareja(nuevaPareja).subscribe(
        (response) => {
          this.modalService.openModalInfo('Pareja creada correctamente');
          this.goBack();
        },
        (error) => {
          console.error('Error al crear la pareja: ', error.error.message);
          this.modalService.openModalError(
            'Error al crear la pareja: ' + error.error.message
          );
        }
      );
    }
  }

  rellenarForm() {
    if (this.tipo !== 'A') {
      this.parejaForm.setValue({
        parejaIdForm: this.pareja?.id,
        parejaOptionForm: this.pareja!.id,
        p_ganadasForm: this.pareja?.p_ganadas,
        p_jugadasForm: this.pareja?.p_jugadas,
        p_perdidasForm: this.pareja?.p_perdidas,
      });
      if (this.tipo === 'D') {
        this.deshabilitarForm();
        this.rellenarEstadisticas();
      } else this.habilitarForm();
    }
  }
  habilitarForm() {
    this.parejaForm.get('parejaIdForm')?.disable();
    this.parejaForm.get('parejaOptionForm')?.enable();
    this.parejaForm.get('p_ganadasForm')?.enable();
    this.parejaForm.get('p_jugadasForm')?.enable();
    this.parejaForm.get('p_perdidasForm')?.enable();
  }
  deshabilitarForm() {
    this.parejaForm.get('parejaIdForm')?.disable();
    this.parejaForm.get('parejaOptionForm')?.disable();
    this.parejaForm.get('p_ganadasForm')?.disable();
    this.parejaForm.get('p_jugadasForm')?.disable();
    this.parejaForm.get('p_perdidasForm')?.disable();
  }
}
