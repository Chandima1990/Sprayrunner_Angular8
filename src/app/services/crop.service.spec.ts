import { TestBed } from '@angular/core/testing';

import { CropService } from "./crop.service";

describe('CropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CropService = TestBed.get(CropService);
    expect(service).toBeTruthy();
  });
});
