import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { JugadoresModule } from './components/jugadores/jugadores.module';
import { OauthModule } from './components/oauth/oauth.module';
import { ParejasModule } from './components/parejas/parejas.module';
import { PartidasModule } from './components/partidas/partidas.module';
import { UbicacionesModule } from './components/ubicaciones/ubicaciones.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BaseChartDirective,
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        JugadoresModule,
        PartidasModule,
        ParejasModule,
        OauthModule,
        UbicacionesModule,
        NgxPaginationModule,
        HttpClientModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SPAPadel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SPAPadel');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toBeUndefined();
  });
});
