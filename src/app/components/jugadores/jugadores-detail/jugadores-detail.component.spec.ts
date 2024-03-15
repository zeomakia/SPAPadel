import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresDetailComponent } from './jugadores-detail.component';

describe('JugadoresDetailComponent', () => {
  let component: JugadoresDetailComponent;
  let fixture: ComponentFixture<JugadoresDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadoresDetailComponent ]
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
