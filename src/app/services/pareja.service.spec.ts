import { TestBed } from '@angular/core/testing';

import { ParejaService } from './pareja.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ParejaServiceService', () => {
  let service: ParejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]});
    service = TestBed.inject(ParejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
