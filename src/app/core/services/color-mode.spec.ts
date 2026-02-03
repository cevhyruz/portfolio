import { TestBed } from '@angular/core/testing';

import { ColorMode } from './color-mode';

describe('ColorMode', () => {
  let service: ColorMode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorMode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
