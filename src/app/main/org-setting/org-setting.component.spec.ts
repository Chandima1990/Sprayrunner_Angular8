import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSettingComponent } from './org-setting.component';

describe('OrgSettingComponent', () => {
  let component: OrgSettingComponent;
  let fixture: ComponentFixture<OrgSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
