import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaDetailComponent } from './partida-detail.component';

describe('HeroDetailComponent', () => {
  let component: PartidaDetailComponent;
  let fixture: ComponentFixture<PartidaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
