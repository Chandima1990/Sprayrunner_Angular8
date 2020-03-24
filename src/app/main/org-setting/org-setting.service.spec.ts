import { TestBed } from '@angular/core/testing';

import { OrgSettingService } from './org-setting.service';

describe('OrgSettingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgSettingService = TestBed.get(OrgSettingService);
    expect(service).toBeTruthy();
  });
});
