import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatorListComponent } from './applicator-list.component';

describe('ApplicatorListComponent', () => {
  let component: ApplicatorListComponent;
  let fixture: ComponentFixture<ApplicatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
