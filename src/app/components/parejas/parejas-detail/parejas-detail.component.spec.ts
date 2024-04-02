import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParejasDetailComponent } from './parejas-detail.component';

describe('ParejasDetailComponent', () => {
  let component: ParejasDetailComponent;
  let fixture: ComponentFixture<ParejasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParejasDetailComponent ]
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
