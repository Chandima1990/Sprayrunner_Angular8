import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatorFormComponent } from './applicator-form.component';

describe('ApplicatorFormComponent', () => {
  let component: ApplicatorFormComponent;
  let fixture: ComponentFixture<ApplicatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
