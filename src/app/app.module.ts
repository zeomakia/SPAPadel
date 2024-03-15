import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { JugadoresModule } from './components/jugadores/jugadores.module';
import { OauthModule } from './components/oauth/oauth.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BaseChartDirective,
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JugadoresModule,
    OauthModule,
  ],
  exports: [ReactiveFormsModule,
    NgIf,
    FormsModule,
    BrowserModule,
   ] ,
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
