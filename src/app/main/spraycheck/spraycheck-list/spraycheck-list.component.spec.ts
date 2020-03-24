import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpraycheckListComponent } from './spraycheck-list.component';

describe('SpraycheckListComponent', () => {
  let component: SpraycheckListComponent;
  let fixture: ComponentFixture<SpraycheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpraycheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpraycheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
