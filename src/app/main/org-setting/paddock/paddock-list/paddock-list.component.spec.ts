import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddockListComponent } from './paddock-list.component';

describe('PaddockListComponent', () => {
  let component: PaddockListComponent;
  let fixture: ComponentFixture<PaddockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
