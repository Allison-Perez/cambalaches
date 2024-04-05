import { TestBed } from '@angular/core/testing';

import { ProdructsService } from './prodructs.service';

describe('ProdructsService', () => {
  let service: ProdructsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdructsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
