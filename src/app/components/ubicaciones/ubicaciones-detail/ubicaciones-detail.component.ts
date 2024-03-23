import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
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
  disable=false;
  ubicacionForm: FormGroup; 


  constructor(private ngZone: NgZone, 
    private ubicacionService: UbicacionService,
    private modalService: ModalService) { 
    this.ubicacionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if(this.tipo==='D' || this.tipo==='M'){
    // En caso de detalle recuperamos los datos y creamos el mapa
    const ubicacionMaps = this.ubicacion?.direccion +', ' + this.ubicacion?.codigo_postal;
    this.geocodeAddress(ubicacionMaps);
      this.ubicacionForm.setValue({
        name:this.ubicacion?.name,
        direccion: this.ubicacion?.direccion,
        codigo_postal: this.ubicacion?.codigo_postal
      });
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
    // this.location.back();
    this.modalService.openModalInfo('Ubicación actualizada');
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
    
        // Llamar al servicio
        this.ubicacionService.addUbicacion(ubicacion).subscribe(
          (response) => {
              this.actualizar.emit();
              this.goBack(); 
          },
          (error) => {
              console.error('Error al crear la partida: ', error);
              this.modalService.openModalError('Error al crear la partida: ' + error);
          }
      );
      }
     
    }
  }

