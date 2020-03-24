import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprayrunConfirmComponent } from './sprayrun-confirm.component';

describe('SprayrunConfirmComponent', () => {
  let component: SprayrunConfirmComponent;
  let fixture: ComponentFixture<SprayrunConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayrunConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayrunConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
