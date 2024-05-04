import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Partida } from '../../../models/partida';
import { PartidaService } from '../../../services/partida.service';
import { ModalService } from 'src/app/services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.scss'],
})
export class PartidasComponent {
  p: number = 1;
  partidas: Partida[] = [];
  identificador: any;
  tipo: any;
  detalle: boolean = false;
  @ViewChild('hijoRef', { read: ElementRef }) hijo!: ElementRef;

  constructor(
    private partidaService: PartidaService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getPartidas().subscribe(
      (partidas) => {
        this.partidas = partidas;
        console.log('Partidos:', this.partidas); // Mueve el console.log aquí
      },
      (error) => {
        this.modalService.openModalError(
          'Ha habido un error recuperando las partidas' + error.error.message);
      }
    );
  }
  /**
   * @method : Recoge las partidas mediante la invicacion del servicio "PartidaService"
   * @returns {Observable<Partida[]>}
   */
  getPartidas(): Observable<Partida[]> {
    return this.partidaService.getPartidas();
  }
/**
 * The `goDetail` function sets properties and scrolls to a specific element based on the provided id
 * and action.
 * @param {number} id - The `id` parameter in the `goDetail` function is a number that represents the
 * identifier of an item or element. It is used to specify which item or element to show details for.
 * @param {string} action - The `action` parameter in the `goDetail` function seems to represent the
 * type of action being performed. It is a string parameter that likely specifies the type of detail or
 * operation to be carried out based on the provided `id`. Examples of `action` values could be "view",
 * "edit
 */
  goDetail(id: number, action: string) {
    this.detalle = false;
    this.identificador = id;
    this.tipo = action;
    this.detalle = true;
    setTimeout(() => {
      if (this.hijo !== undefined)
        this.hijo.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
  /**
   * Nos lleva al metodo qué crea un partido, al metodo goDetail(), con la 'A' como parámetro.
   * @method : Nos lleva al metodo qué crea un partido, al metodo goDetail(), con la 'A' como parámetro.
   */
  createMatch() {
    this.goDetail(0, 'A');
  }
  /**
   * The function `cerrarHijo()` closes a child element and scrolls the window to the top.
   */
  cerrarHijo() {
    this.detalle = false;
    window.scrollTo(0, 0);
  }
  eliminarPartida(id: number) {
    this.partidaService.deletePartida(id).subscribe(
      (resultado) => {
        console.log('Se ha eliminado el registro:' + id);
        this.modalService.openModalInfo('Registro eliminado correctamente');
        this.getPartidas().subscribe((partidas) => {
          this.partidas = partidas;
          console.log('Partidos:', this.partidas); // Mueve el console.log aquí
          this.p = 1;
        });
      },
      (error) => {
        this.modalService.openModalError(
          'Error al borrar la partida: ' + error.error.message
        );
        console.log('error!!!!!');
      }
    );
  }
}
