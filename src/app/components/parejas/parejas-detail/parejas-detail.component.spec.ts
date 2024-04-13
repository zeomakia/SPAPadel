import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParejasDetailComponent } from './parejas-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ParejasDetailComponent', () => {
  let component: ParejasDetailComponent;
  let fixture: ComponentFixture<ParejasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParejasDetailComponent ],
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

    fixture = TestBed.createComponent(ParejasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
