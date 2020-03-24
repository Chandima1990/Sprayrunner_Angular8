import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddockFormComponent } from './paddock-form.component';

describe('PaddockFormComponent', () => {
  let component: PaddockFormComponent;
  let fixture: ComponentFixture<PaddockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
