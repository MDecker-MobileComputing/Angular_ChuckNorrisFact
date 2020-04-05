import { TestBed } from '@angular/core/testing';

import { IcndbService } from './icndb.service';

describe('IcndbService', () => {
  let service: IcndbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcndbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
