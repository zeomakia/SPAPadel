import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParejasComponent } from './parejas.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ParejasComponent', () => {
  let component: ParejasComponent;
  let fixture: ComponentFixture<ParejasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParejasComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        SharedModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        BaseChartDirective,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
