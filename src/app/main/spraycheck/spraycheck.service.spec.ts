import { TestBed } from '@angular/core/testing';

import { SpraycheckService } from './spraycheck.service';

describe('SpraycheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpraycheckService = TestBed.get(SpraycheckService);
    expect(service).toBeTruthy();
  });
});
