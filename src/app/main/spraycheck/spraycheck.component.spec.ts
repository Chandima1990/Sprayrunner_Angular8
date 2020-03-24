import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpraycheckComponent } from './spraycheck.component';

describe('SpraycheckComponent', () => {
  let component: SpraycheckComponent;
  let fixture: ComponentFixture<SpraycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpraycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpraycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
