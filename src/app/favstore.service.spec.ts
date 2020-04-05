import { TestBed } from '@angular/core/testing';

import { FavstoreService } from './favstore.service';

describe('FavstoreService', () => {
  let service: FavstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
