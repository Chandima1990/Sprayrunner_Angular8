import { TestBed } from '@angular/core/testing';

import { SprayrunService } from './sprayrun.service';

describe('SprayrunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprayrunService = TestBed.get(SprayrunService);
    expect(service).toBeTruthy();
  });
});
