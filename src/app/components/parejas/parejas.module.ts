import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParejasComponent } from './parejas-list/parejas.component';
import { ParejasDetailComponent } from './parejas-detail/parejas-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    ParejasComponent,
    ParejasDetailComponent
  ],
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
  ],
  exports: [
    
  ]
})
export class ParejasModule { }