import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UbicacionesDetailComponent } from './ubicaciones-detail.component';
import { UbicacionService } from 'src/app/services/ubicacion-service.service';
import { ModalService } from 'src/app/services/modal.service';
import { NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

const googleMock = {
  maps: {
    Geocoder: class {
      geocode() {
        // Simula la respuesta de la función geocode
        const results = [{ geometry: { location: { lat: () => 40.7128, lng: () => -74.006 } } }];
        const status = 'OK';
        const callback = arguments[1];
        callback(results, status);
      }
    }
  }
};


describe('UbicacionesDetailComponent', () => {
  let component: UbicacionesDetailComponent;
  let fixture: ComponentFixture<UbicacionesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbicacionesDetailComponent ],
      imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
       ],
      providers: [
        { 
          provide: NgZone, 
          useValue: { 
            run: (fn: Function) => fn(),
            onMicrotaskEmpty: { subscribe: () => {} },
            onState: (fn: Function) => fn(),
            runOutsideAngular: (fn: Function) => fn(),
            onStable: { subscribe: () => {} },
            onUnstable: { subscribe: () => {} },
            onError: { subscribe: () => {} }// Agregar una implementación mínima para onStable
          }
        }
        ,// Proporciona una implementación mínima de onMicrotaskEmpty}, // mock NgZone
        { provide: UbicacionService, useValue: { addUbicacion: () => of({}), modifyUbicacion: () => of({}) } }, // mock UbicacionService
        { provide: ModalService, useValue: {} }, // mock ModalService
        { provide: ElementRef, useValue: { nativeElement: { style: {} } } }, // mock ElementRef
        { provide: ChangeDetectorRef, useValue: {} }, // mock ChangeDetectorRef
        { provide: 'google', useValue: googleMock } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
