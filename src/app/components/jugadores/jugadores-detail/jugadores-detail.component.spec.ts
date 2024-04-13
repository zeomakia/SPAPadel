import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresDetailComponent } from './jugadores-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

describe('JugadoresDetailComponent', () => {
  let component: JugadoresDetailComponent;
  let fixture: ComponentFixture<JugadoresDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadoresDetailComponent ],
      imports:[CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
