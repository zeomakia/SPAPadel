import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesDetailComponent } from './ubicaciones-detail.component';

describe('UbicacionesDetailComponent', () => {
  let component: UbicacionesDetailComponent;
  let fixture: ComponentFixture<UbicacionesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionesDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UbicacionesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
