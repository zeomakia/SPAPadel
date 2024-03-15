import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JugadoresComponent } from './jugadores-list/jugadores.component';
import { JugadoresDetailComponent } from './jugadores-detail/jugadores-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    JugadoresComponent,
    JugadoresDetailComponent
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
  ],
  exports: [
  ]
})
export class JugadoresModule { }