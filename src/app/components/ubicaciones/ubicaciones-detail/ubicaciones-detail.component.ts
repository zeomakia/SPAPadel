import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/app/models/ubicacion';
import { ModalService } from 'src/app/services/modal.service';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';

@Component({
  selector: 'app-ubicaciones-detail',
  templateUrl: './ubicaciones-detail.component.html',
  styleUrl: './ubicaciones-detail.component.scss'
})
export class UbicacionesDetailComponent {
  @Input() tipo?:string;
  @Input() ubicacion?: Ubicacion;
  @Output() cerrarDetalle = new EventEmitter<void>();
  @Output() actualizar = new EventEmitter<void>();
  @ViewChild('map', { static: true })
  mapElement!: ElementRef;
  ubicacionForm: FormGroup; 


  constructor(private ngZone: NgZone, 
    private ubicacionService: UbicacionService,
    private modalService: ModalService,
    private readonly cd: ChangeDetectorRef) { 
    this.ubicacionForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // En caso de detalle recuperamos los datos y creamos el mapa
    this.actualizarMapa();
    this.actualizarForm();
  }
  ngOnChanges() {
    // En caso de detalle recuperamos los datos y creamos el mapa
    this.actualizarMapa();
   
    this.actualizarForm();
    

  }
  actualizarMapa() {
    if(this.tipo!=='A'){
      const ubicacionMaps = this.ubicacion?.direccion +', ' + this.ubicacion?.codigo_postal;
      this.geocodeAddress(ubicacionMaps);
    } 
    
  }
  geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        this.loadMap(results[0].geometry.location );
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      } 
    });    
  }  
  loadMap(location: any) {
    const mapProperties = {
      center: location,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  goBack(): void {
    if(this.tipo==='M')
      this.modalService.openModalInfo('Ubicación modificada correctamente');
    else
      this.modalService.openModalInfo('Ubicación creada correctamente');
    
    this.actualizar.emit();
    this.cerrarDetalle.emit();

  }
  guardarubicacion(){
      if (this.ubicacionForm.valid) {
        // Crear una nueva instancia de Partida
        const ubicacion: Ubicacion = {
          id: this.tipo==='M'?this.ubicacionForm.get('id')?.value:0,
          name: this.ubicacionForm.get('name')?.value,
          direccion: this.ubicacionForm.get('direccion')?.value,
          codigo_postal: this.ubicacionForm.get('codigo_postal')?.value,
        };
        if(this.tipo==='M'){
          // Llamar al servicio
          this.ubicacionService.modifyUbicacion(ubicacion).subscribe(
            (response) => {
                this.goBack(); 
            },
            (error) => {
                console.error('Error al modificar la partida: ', JSON.stringify(error));
                this.modalService.openModalError('Error al modificar la partida: ');
            }
          );
        }  else{
          this.ubicacionService.addUbicacion(ubicacion).subscribe(
            (response) => {
                this.goBack(); 
            },
            (error) => {
                console.error('Error al crear la partida: ', JSON.stringify(error));
                this.modalService.openModalError('Error al crear la ubicacio: ' +error.error.message);
            }
          );
        }
      }
     
    }
  
   actualizarForm(): void  {
    if(this.tipo!=='A'){
      this.ubicacionForm.setValue({
        id: this.ubicacion?.id,
        name:this.ubicacion?.name,
        direccion: this.ubicacion?.direccion,
        codigo_postal: this.ubicacion?.codigo_postal
      });
      if(this.tipo==='D')
        this.deshabilitarForm();
      else
        this.habilitarForm();
    }else{
      this.ubicacionForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        direccion: new FormControl('', Validators.required),
        codigo_postal: new FormControl('', Validators.required),
      });
    }
  }
  habilitarForm() {
    this.ubicacionForm.get('name')?.enable();
    this.ubicacionForm.get('direccion')?.enable();
    this.ubicacionForm.get('codigo_postal')?.enable();
  }
  deshabilitarForm() {
    this.ubicacionForm.get('name')?.disable();
    this.ubicacionForm.get('direccion')?.disable();
    this.ubicacionForm.get('codigo_postal')?.disable();
  }
}

