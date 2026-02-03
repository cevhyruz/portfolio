import { TestBed } from '@angular/core/testing';

import { InMemoryStorage } from './in-memory-storage';

describe('InMemoryStorage', () => {
  let service: InMemoryStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
