import { TestBed } from '@angular/core/testing';

import { ParejaService } from './pareja.service';

describe('ParejaServiceService', () => {
  let service: ParejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
