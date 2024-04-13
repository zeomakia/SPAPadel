import { TestBed } from '@angular/core/testing';

import { PartidaService } from './partida.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartidaServiceService', () => {
  let service: PartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]});
    service = TestBed.inject(PartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
