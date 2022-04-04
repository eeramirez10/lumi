import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtareasComponent } from './ctareas.component';

describe('CtareasComponent', () => {
  let component: CtareasComponent;
  let fixture: ComponentFixture<CtareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
