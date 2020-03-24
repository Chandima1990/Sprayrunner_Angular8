import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatorsComponent } from './applicators.component';

describe('ApplicatorsComponent', () => {
  let component: ApplicatorsComponent;
  let fixture: ComponentFixture<ApplicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
