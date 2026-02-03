import { TestBed } from '@angular/core/testing';
import { InMemoryStorageService } from './in-memory-storage';

describe('InMemoryStorageService', () => {
  let service: InMemoryStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
