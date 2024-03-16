import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from '../components/oauth/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from '../app-routing.module';
import { PerfilUserComponent } from '../components/perfil-user/perfil-user.component';



@NgModule({
  declarations: [ModalComponent,NavbarComponent,FooterComponent,PerfilUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AppRoutingModule,
  ],
  exports: [ModalComponent,NavbarComponent,FooterComponent,PerfilUserComponent]
})
export class SharedModule { }
