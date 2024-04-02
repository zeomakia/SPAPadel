// import { ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';

// import { Partida } from '../../../models/partida';
// import { PartidaService } from '../../../services/partida.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Pareja } from '../../../models/pareja';
// import { ParejaService } from '../../../services/pareja.service';
// import { UbicacionService } from '../../../services/ubicacion-service.service';
// import { Ubicacion } from '../../../models/ubicacion';

// @Component({
//   selector: 'app-partida-detail',
//   templateUrl: './partida-detail.component.html',
//   styleUrls: [ './partida-detail.component.scss' ]
// })
// export class PartidaDetailComponent implements OnInit {
//   nuevaPartidaForm: FormGroup; 
//   @Input() identificador!: number;
//   @Input() tipo?: string;
//   partida!: Partida;
//   parejas: Pareja[]=[];
//   ubicaciones: Ubicacion[]=[];
//   disable: boolean=true;
//   isPartidaNueva:boolean=false;
//   constructor(
//     private route: ActivatedRoute,
//     private partidaService: PartidaService,
//     private ubicacionService: UbicacionService,
//     private parejaService: ParejaService,
//     private location: Location,
//     private readonly cd: ChangeDetectorRef
//   ) {
//     this.nuevaPartidaForm = new FormGroup({
//       // idForm: new FormControl('', Validators.required),
//       pareja1Form: new FormControl('', Validators.required),
//       pareja2Form: new FormControl('', Validators.required),
//       ubicacionForm: new FormControl('', Validators.required),
//       parejaGanadoraForm: new FormControl ('',Validators.required),
//       resultadoForm: new FormControl ('',Validators.required),
//       diaForm: new FormControl('', Validators.required)
//     });
//   }

//   ngOnInit(): void {
//     if(this.identificador==0){
    
//      this.isPartidaNueva=true;
//      this.getParejas();
//      this.getUbicaciones();
//     }else{
//     this.getPartida();
//     this.disable= this.tipo==='D';
//     }
//   }
//   ngOnChanges(changes: SimpleChanges): void {
//     if(this.identificador==0){
//       this.isPartidaNueva=true;
//       this.getParejas();
//       this.getUbicaciones();
 
//      }else{
//       this.isPartidaNueva=false;
//      this.getPartida();
//      this.disable= this.tipo==='D';
//      }
//   }

//   getPartida(): void {
//     // const id = +this.route.snapshot.paramMap.get('identificador')!.valueOf();
//     this.partidaService.getPartida(this.identificador)
//       .subscribe(partida => this.partida = partida);
//   }
//   getParejas():void{
//     this.parejaService.getParejas()
//       .subscribe(parejas =>  this.parejas = parejas);
//    console.log("nombre jugador" + this.parejas[0].nombre_jugador1);
//   }
//   getUbicaciones():void{
//     this.ubicacionService.getUbicaciones()
//       .subscribe(ubicaciones =>  this.ubicaciones = ubicaciones);
//    console.log("nombre jugador" + this.ubicaciones[0].nombre);
//   }

//   goBack(): void {
//     this.location.back();
//   }

//   save(): void {
//     this.partidaService.updatePartida(this.partida!)
//       .subscribe(() => this.goBack());
//   }
//   guardarNuevaPartida() {
//     if (this.nuevaPartidaForm.valid) {
//       // Crear una nueva instancia de Partida
//       const nuevaPartida: Partida = {
//         id: 0, // O el valor por defecto que desees para el nuevo id
//         dia: this.nuevaPartidaForm.get('diaForm')?.value,
//         pareja1: this.nuevaPartidaForm.get('pareja1Form')?.value,
//         pareja2: this.nuevaPartidaForm.get('pareja2Form')?.value,
//         pareja_ganadora: this.nuevaPartidaForm.get('parejaGanadoraForm')?.value,
//         ubicacion: this.nuevaPartidaForm.get('ubicacionForm')?.value,
//         resultado: this.nuevaPartidaForm.get('resultadoForm')?.value
//       };
  
//       // Llamar al servicio con la nueva partida
//       this.partidaService.addPartida(nuevaPartida)
//         .subscribe(() => this.goBack());
//     }
//   }
  
// }