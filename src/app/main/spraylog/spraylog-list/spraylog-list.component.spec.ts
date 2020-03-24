import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpraylogListComponent } from './spraylog-list.component';

describe('SpraylogListComponent', () => {
  let component: SpraylogListComponent;
  let fixture: ComponentFixture<SpraylogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpraylogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpraylogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
