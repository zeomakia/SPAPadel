import { TestBed } from '@angular/core/testing';

import { JugadorService } from './jugador.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JugadorServiceService', () => {
  let service: JugadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(JugadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
