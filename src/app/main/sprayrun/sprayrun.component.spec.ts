import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprayrunComponent } from './sprayrun.component';

describe('SprayrunComponent', () => {
  let component: SprayrunComponent;
  let fixture: ComponentFixture<SprayrunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayrunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
