import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaDetailComponent } from './partida-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ParejaService } from 'src/app/services/pareja.service';
import { PartidaService } from 'src/app/services/partida.service';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PartidaDetailComponent', () => {
  let component: PartidaDetailComponent;
  let fixture: ComponentFixture<PartidaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidaDetailComponent],
      imports: [
        FormsModule, // Importamos FormsModule
        ReactiveFormsModule, // Importamos ReactiveFormsModule
        NgxPaginationModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        SharedModule,
      ], 
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } }, // mock ActivatedRoute
        { provide: PartidaService, useValue: { getPartida: () => of({ /* mock Partida data */ }) } }, // mock PartidaService
        { provide: UbicacionService, useValue: { getUbicaciones: () => of([]) } }, // mock UbicacionService
        { provide: ParejaService, useValue: { getParejas: () => of([]) } }, // mock ParejaService
        { provide: Location, useValue: {} }, // mock Location
        { provide: ModalService, useValue: {} } // mock ModalService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
