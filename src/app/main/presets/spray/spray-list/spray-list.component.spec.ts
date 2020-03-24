import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprayListComponent } from './spray-list.component';

describe('SprayListComponent', () => {
  let component: SprayListComponent;
  let fixture: ComponentFixture<SprayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
