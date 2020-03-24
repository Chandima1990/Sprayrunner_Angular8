import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpraylogComponent } from './spraylog.component';

describe('SpraylogComponent', () => {
  let component: SpraylogComponent;
  let fixture: ComponentFixture<SpraylogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpraylogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpraylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
