import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddockComponent } from './paddock.component';

describe('PaddockComponent', () => {
  let component: PaddockComponent;
  let fixture: ComponentFixture<PaddockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
