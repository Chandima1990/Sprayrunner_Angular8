import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprayrunFormComponent } from './sprayrun-form.component';

describe('SprayrunFormComponent', () => {
  let component: SprayrunFormComponent;
  let fixture: ComponentFixture<SprayrunFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayrunFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayrunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
