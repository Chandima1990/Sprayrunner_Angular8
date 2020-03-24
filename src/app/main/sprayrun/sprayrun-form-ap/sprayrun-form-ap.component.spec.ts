import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprayrunFormApComponent } from './sprayrun-form-ap.component';

describe('SprayrunFormApComponent', () => {
  let component: SprayrunFormApComponent;
  let fixture: ComponentFixture<SprayrunFormApComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayrunFormApComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayrunFormApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
